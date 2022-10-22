# Student Life Back End

## Documentation Api

### Autentikasi

##### 1. Register

###### Endpoint

```Javascript
/api/register
```

###### Properti

| Properti         | Deskripsi                                                            | Type   | Validasi                            |
| ---------------- | -------------------------------------------------------------------- | ------ | ----------------------------------- |
| email            | Alamat Email yang Digunakan Untuk Mendaftar ke Dalam Website         | String | Input Harus Berupa Email yang Benar |
| password         | Password Yang Digunakan Untuk Mendaftar ke Dalam Website             | String | Input Minimal 8 Karakter            |
| password_confirm | Password yang Dituliskan Kembali Sebagai Password Konfirmasi Kembali | String | Input Minimal 8 Karakter            |

###### Contoh Request dan Response

```Javascript
// Contoh Request yang Benar
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
    password_confirm : 'indonesiainyabesar',
}
// Response
{
    status : 'success',
    msg : 'Signup Successfully'
}
// Contoh Request yang Salah
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
    password_confirm : 'indonesiainyabesar',
}
// Response
{
    status : 'error',
    msg : 'Password confirmation does not match password'
}
```

##### 2. Login

###### Endpoint

```Javascript
/api/login
```

###### Properti

| Properti | Deskripsi                                                    | Type   | Validasi                            |
| -------- | ------------------------------------------------------------ | ------ | ----------------------------------- |
| email    | Alamat Email yang Digunakan Untuk Mendaftar ke Dalam Website | String | Input Harus Berupa Email yang Benar |
| password | Password Yang Digunakan Untuk Mendaftar ke Dalam Website     | String | Input Minimal 8 Karakter            |

###### Contoh Request dan Response

```Javascript
// Contoh Request yang Benar
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
}
// Response
{
    status : 'success',
    msg : 'Login Successfully',
    data : {
        id: '6353b066327fac926fb26d7a',
        email: 'arisakhyar704@gmail.com',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNTNiMDY2MzI3ZmFjOTI2ZmIyNmQ3YSIsImVtYWlsIjoiYXJpc21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFd1UmZRc1U1UzNoeXVFaUJuRmw1ZC5XbG1uYnlJUVgxMURWZEdmNlkyTkFBV3ZadU1yQnhhIiwiX192IjowfSwiaWF0IjoxNjY2NDI5NDMzfQ.BkHJyJt5wogx3QfUU7TeRlyRyJj_ACg3eHcBen9zl7Q'
    }
}

// Contoh Request yang Salah
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyakecil',
}
// Response
{
    status : 'error',
    msg : 'Password is Wrong'
}
```

##### 3. Logout

###### Endpoint

```Javascript
/api/logout
```

###### Properti

| Properti       | Deskripsi                                                                   | Type   | Validasi |
| -------------- | --------------------------------------------------------------------------- | ------ | -------- |
| x-access-token | JSON Web Token Yang diterima Saat Proses Login dan Disimpan Kedalam Cookies | String | Ada      |

###### Contoh Request dan Response

```Javascript
// Contoh Request yang Benar
{
    x-acces-token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNTNiMDY2MzI3ZmFjOTI2ZmIyNmQ3YSIsImVtYWlsIjoiYXJpc21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFd1UmZRc1U1UzNoeXVFaUJuRmw1ZC5XbG1uYnlJUVgxMURWZEdmNlkyTkFBV3ZadU1yQnhhIiwiX192IjowfSwiaWF0IjoxNjY2NDI5NDMzfQ.BkHJyJt5wogx3QfUU7TeRlyRyJj_ACg3eHcBen9zl7Q'
}
// Response
{
    status : 'success',
    msg : 'Logout Successfully',
}
```
