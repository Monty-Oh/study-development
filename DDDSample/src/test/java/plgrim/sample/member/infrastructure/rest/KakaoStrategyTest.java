package plgrim.sample.member.infrastructure.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.HttpUrl;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import okhttp3.mockwebserver.RecordedRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import plgrim.sample.common.enums.ErrorCode;
import plgrim.sample.common.exceptions.UserException;
import plgrim.sample.member.infrastructure.rest.dto.KakaoTokenDTO;
import plgrim.sample.member.infrastructure.rest.dto.KakaoUserInfoDTO;
import plgrim.sample.member.infrastructure.rest.dto.KakaoValidateTokenDTO;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("KakaoRestApiService 테스트")
@ExtendWith(MockitoExtension.class)
class KakaoStrategyTest {
    private static final String MOCK_WEB_SERVER_URL = "/mock/test";
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final KakaoStrategy kakaoStrategy = new KakaoStrategy();

    private MockWebServer mockWebServer;

    @BeforeEach
    void setUp() throws IOException {
        //  Mock API 서버 초기화
        mockWebServer = new MockWebServer();
        //  Mock 서버 시작
        mockWebServer.start();
    }

    @AfterEach
    void finish() throws IOException {
        // 매 테스트마다 서버 다시 닫음.
        mockWebServer.shutdown();
    }

    @DisplayName("카카오 토큰 발급 단위 테스트 (code)")
    @Test
    void getKakaoToken() throws Exception {
        //  given
        KakaoTokenDTO responseBody = KakaoTokenDTO.builder()
                .access_token("ACCESS_TOKEN")
                .expires_in(43199)
                .refresh_token("REFRESH_TOKEN")
                .refresh_token_expires_in(24000)
                .token_type("bearer")
                .scope("account_email_profile")
                .build();
        mockWebServer.enqueue(new MockResponse()
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .setBody(objectMapper.writeValueAsString(responseBody)));
        HttpUrl url = mockWebServer.url(MOCK_WEB_SERVER_URL);
        String code = "code_for_test";

        ReflectionTestUtils.setField(kakaoStrategy, "restApi", "restApi");
        ReflectionTestUtils.setField(kakaoStrategy, "redirectUrl", "redirectUrl");
        ReflectionTestUtils.setField(kakaoStrategy, "getTokenUrl", url.toString());

        //  when
        kakaoStrategy.getToken(code);
        RecordedRequest request = mockWebServer.takeRequest();

        //  then
        assertThat(request.getRequestUrl().encodedPath()).isEqualTo(url.encodedPath());
        assertThat(request.getMethod()).isEqualTo(HttpMethod.POST.toString());
        String params = "grant_type=authorization_code&client_id=restApi&redirect_uri=redirectUrl&code=code_for_test";
        assertThat(request.getRequestUrl().encodedQuery()).isEqualTo(params);
    }

    @DisplayName("엑세스 토큰 검증 단위 테스트 - 토큰 이상 없음")
    @Test
    void validateToken() throws Exception {
        //  given
        KakaoValidateTokenDTO responseBody = KakaoValidateTokenDTO.builder()
                .id(10L)
                .expires_in(100000)
                .app_id(10000)
                .build();
        mockWebServer.enqueue(new MockResponse()
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .setBody(objectMapper.writeValueAsString(responseBody)));
        HttpUrl url = mockWebServer.url(MOCK_WEB_SERVER_URL);
        String access_token = "access_token_for_test";

        ReflectionTestUtils.setField(kakaoStrategy, "accessTokenInfoUrl", url.toString());

        //  when
        kakaoStrategy.validateToken(access_token);
        RecordedRequest request = mockWebServer.takeRequest();

        //  then
        assertThat(request.getRequestUrl()).isEqualTo(url);
        assertThat(request.getMethod()).isEqualTo(HttpMethod.GET.toString());
        String params = "Bearer " + access_token;
        assertThat(request.getHeader(HttpHeaders.AUTHORIZATION)).isEqualTo(params);
    }

    @DisplayName("엑세스 토큰 검증 단위 테스트 - 카카오 플랫폼 서비스 내부 장애 or 필수 인자 값 오류")
    @Test
    void validateTokenFailKakaoInternalServerError() {
        //  given
        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(400));
        HttpUrl url = mockWebServer.url(MOCK_WEB_SERVER_URL);
        String access_token = "access_token_for_test";

        ReflectionTestUtils.setField(kakaoStrategy, "accessTokenInfoUrl", url.toString());

        //  when
        ErrorCode error = assertThrows(UserException.class, () -> kakaoStrategy.validateToken(access_token)).getErrorCode();

        //  then
        assertThat(error).isEqualTo(ErrorCode.API_SERVER);
    }

    @DisplayName("액세스 토큰 검증 단위 테스트 - 토큰 만료됨")
    @Test
    void validateTokenFailExfiredToken() {
        //  given
        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(401));
        HttpUrl url = mockWebServer.url(MOCK_WEB_SERVER_URL);
        String access_token = "access_token_for_test";

        ReflectionTestUtils.setField(kakaoStrategy, "accessTokenInfoUrl", url.toString());

        //  when
        ErrorCode error = assertThrows(UserException.class, () -> kakaoStrategy.validateToken(access_token)).getErrorCode();

        //  then
        assertThat(error).isEqualTo(ErrorCode.EXPIRED_TOKEN);
    }

    @DisplayName("카카오 유저 정보 조회")
    @Test
    void getKakaoUserInfo() throws JsonProcessingException, InterruptedException {
        //  given
        KakaoUserInfoDTO kakaoUserInfoDTO = KakaoUserInfoDTO.builder()
                .id(1L)
                .has_signed_up(false)
                .connected_at(new Date())
                .synched_at(new Date())
                .properties(new HashMap<>() {{
                    put("nickname", "testNickname");
                }})
                .kakao_account(new HashMap<>() {{
                    put("profile_nickname_needs_agreement", false);
                    put("profile", new HashMap<>() {{
                        put("nickname", "testNickname");
                    }});
                    put("has_email", true);
                    put("email_needs_agreement", true);
                }})
                .build();
        mockWebServer.enqueue(new MockResponse()
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .setBody(objectMapper.writeValueAsString(kakaoUserInfoDTO)));
        HttpUrl url = mockWebServer.url(MOCK_WEB_SERVER_URL);
        String access_token = "access_token_for_test";

        ReflectionTestUtils.setField(kakaoStrategy, "userInfo", url.toString());

        //  when
        String nickname = kakaoStrategy.getUserInfo(access_token).getProperties().get("nickname");
        RecordedRequest request = mockWebServer.takeRequest();

        //  then
        assertThat(nickname).isEqualTo(kakaoUserInfoDTO.getProperties().get("nickname"));
        assertThat(request.getRequestUrl()).isEqualTo(url);
    }
}