package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.UserDto;
import com.kyp.eoneo.entity.Authority;
import com.kyp.eoneo.entity.PrefTopic;
import com.kyp.eoneo.entity.User;
import com.kyp.eoneo.repository.UserRepository;
import com.kyp.eoneo.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    } //UserRepository, PasswordEncoder 주입받음

    @Transactional
    public User signup(UserDto userDto) { //회원가입 로직 수행 메소드
        if (userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        } //이미 가입된 유저인지 찾아봄

        //빌더 패턴의 장점
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER") //회원가입 통해서 생성되는 유저는 ROLE_USER 하나만 가짐
                .build();

        User user = User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .username(userDto.getUsername())
                .authorities(Collections.singleton(authority))
                .firstLogin(userDto.getFirstLogin())
                .build();

        return userRepository.save(user); //DB에 존재하지 않는 유저라면 Authority와 User 정보를 생성해서 UserRepository의 save 메소드를 이용해서 DB에 정보 저장
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String email) {
        return userRepository.findOneWithAuthoritiesByEmail(email);
    } //email을 파라미터로 받아서 어떠한 email이든 email에 해당하는 user객체와 권한정보를 가져오는 메소드

    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithAuthoritiesByEmail);
    } //현재 SecurityContext에 저장된 email의 정보만 받아오는 메소드

    @Transactional(readOnly = true)
    public UserDto getUserInfo(Long id){
        User user = userRepository.findUserById(id);
//        System.out.println(user.getAuthorities()); //테이블3개 user, user_authority, authority,
//        Set<Authority> authorities = user.getAuthorities();
        List<PrefTopic> prefTopicList = new ArrayList<>();

        for(int i=0; i<user.getPrefTopics_User().size(); i++){
            prefTopicList.add(user.getPrefTopics_User().get(i));
        }
        UserDto userDto = UserDto.builder().email(user.getEmail()).username(user.getUsername()).firstLogin(user.getFirstLogin())
                        .joindate(user.getJoindate()).userDetail(user.getUserDetail()).userLanguage(user.getUserLanguage())
                        .prefTopic_User(prefTopicList).build();

        return userDto;
    }

    @Transactional(readOnly = true)
    public int getLoginCount(String email){
        User user = userRepository.findUserByEmail(email);
        return user.getFirstLogin();
    }

    @Transactional
    public void setLoginCount(String email){
        User user = userRepository.findUserByEmail(email);
        user.setFirstLogin(1);

        userRepository.save(user);
    }
}
