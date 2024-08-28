package plgrim.sample.member.controller.validation;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.*;

import static org.apache.logging.log4j.util.Strings.isNotBlank;

// 지정한 대상의 JavaDoc에 이 어노테이션의 존재를 표기하도록 지정
@Documented
@Constraint(validatedBy = PasswordValidation.Validator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordValidation {

    String message() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    int min() default 0;

    int max() default 2147483647;

    class Validator implements ConstraintValidator<PasswordValidation, String> {
        private int min;        // 비밀번호 최소 문자
        private int max;        // 비밀번호 최대 문자

        @Override
        public void initialize(PasswordValidation constraintAnnotation) {
            // 어노테이션 등록 시 parameter 초기화
            min = constraintAnnotation.min();
            max = constraintAnnotation.max();
        }

        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            // 비밀번호가 비어있는지?
            if (!isNotBlank(value)) {
                addConstraintViolation(context, "비밀번호를 입력해주세요.");
                return false;
            }
            // 비밀번호의 자릿수가 올바른지?
            else if (value.length() < this.min || value.length() > this.max) {
                addConstraintViolation(context, String.format("비밀번호는 %d자 ~ %d자 사이로 입력해주세요.", this.min, this.max));
                return false;
            }

            return true;
        }

        // context에 메세지 설정
        private void addConstraintViolation(ConstraintValidatorContext context, String msg) {

            context.disableDefaultConstraintViolation();                                    //기본 메시지 비활성화
            context.buildConstraintViolationWithTemplate(msg).addConstraintViolation();     //새로운 메시지 추가
        }
    }
}
