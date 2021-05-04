package hello.hellospring.controller;

public class MemberForm {
    // html에서 폼으로 서버로 넘길때의 이름과 같아야함.
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
