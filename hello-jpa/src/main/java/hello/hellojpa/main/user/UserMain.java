package hello.hellojpa.main.user;

import hello.hellojpa.common.exception.DuplicateEmailException;
import hello.hellojpa.common.exception.UserNotFoundException;
import hello.hellojpa.domain.User;
import hello.hellojpa.main.EMF;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

public class UserMain {
    public static UserService userService = new UserService();

    public static void main(String[] args) throws IOException {
        EMF.init();
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(System.in));

        while (true) {
            System.out.println("명령어를 입력하세요.");
            String line = reader.readLine();

            String[] commands = line.split(" ");

            // equals: 대소문자 비교, equalsIgnoreCase: 대소문자 무시
            if (commands[0].equalsIgnoreCase("exit")) break;

            String command = commands[0].toLowerCase(Locale.ROOT);

            switch (command) {
                case "join":
                    handleJoinCommand(commands);
                    break;

                case "view":
                    handleViewCommand(commands);
                    break;

                case "list":
                    handleListCommand();
                    break;

                case "changename":
                    handleChangeNameCommand(commands);
                    break;

                case "delete":
                    handleDeleteUser(commands);
                    break;
            }
        }
        EMF.close();
    }

    private static void handleJoinCommand(String[] cmd) {
        if (cmd.length != 3) {
            System.out.println("명령어가 올바르지 않습니다.");
            System.out.println("사용법: join 이메일 이름");
            return;
        }

        try {
            User user = new User();
            user.setEmail(cmd[1]);
            user.setName(cmd[2]);
            System.out.println("user = " + user);
            userService.join(user);
            System.out.println("가입 요청을 처리했습니다.");
        } catch (DuplicateEmailException e) {
            System.out.println("이미 같은 이메일을 가진 사용자가 존재합니다.");
        }
    }

    private static void handleViewCommand(String[] cmd) {
        if (cmd.length != 2) {
            System.out.println("명령어가 올바르지 않습니다.");
            System.out.println("사용법: view 이메일");
            return;
        }

        Optional<User> optionalUser = userService.getUser(cmd[1]);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println("user = " + user);
        } else {
            System.out.println("존재하지 않습니다.");
        }
    }

    private static void handleChangeNameCommand(String [] cmd) {
        if(cmd.length != 3) {
            System.out.println("명령어가 올바르지 않습니다.");
            System.out.println("사용법: changename 이메일 새이름");
            return;
        }

         try {
             userService.changeName(cmd[1], cmd[2]);
             System.out.println("이름을 변경했습니다.");
         } catch (UserNotFoundException e) {
             System.out.println("존재하지 않습니다.");
         }
    }

    private static void handleListCommand() {
        List<User> users = userService.getAllUsers();
        if(users.isEmpty()) System.out.println("사용자가 없습니다.");
        else users.forEach(System.out::println);
    }
    
    private static void handleDeleteUser(String[] cmd) {
        if(cmd.length != 2) {
            System.out.println("명령어가 올바르지 않습니다.");
            System.out.println("사용법: delete 이메일");
            return;
        }

        try {
            userService.deleteUser(cmd[1]);
            System.out.println("탈퇴처리 했습니다.");
        } catch (UserNotFoundException e) {
            System.out.println("존재하지 않습니다.");
        }
    }
}
