package com.kyp.eoneo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user_lang")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLanguage {

    @Id
    @Column(name = "id")
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fluent", referencedColumnName = "code")
    private Language fluentLanguage;

    @ManyToOne
    @JoinColumn(name = "native", referencedColumnName = "code")
    private Language nativeLanguage;

    @ManyToOne
    @JoinColumn(name = "want", referencedColumnName = "code")
    private Language wantLanguage;
}
