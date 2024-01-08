# Blog Projekt Grupowy - Spring Boot & React

## Opis projektu

Projekt zaliczeniowy z przedmiotu "Studium przypadku - programowanie w grupie programistycznej".
Grupa składa się z trzech osób i postanowiła wykorzystać frameworki Spring Boot oraz React do stworzenia dynamicznego bloga.
Wersja javy - 21

## Instrukcje uruchomienia

### Backend (Spring Boot)

1. Otwórz projekt w środowisku programistycznym obsługującym Java (np. IntelliJ IDEA).
2. Zainstaluj Postgresql: [link](https://www.postgresql.org/download/)
3. Otwórz pgAdmin i utwórz nową bazę danych (nazwa: blog) w Postgresql
4. Dodaj właściwości Postgresql do zmiennych środowiskowych intelliji [link](https://imgur.com/a/0CnKOE2)
5. Utwórz konto dla firebase i dodaj właściwości do zmiennych środowiskowych intellij (BUCKET_NAME, GET_IMAGE_URL, KEY_FILENAME)
[link](https://imgur.com/a/0CnKOE2)
Przykład:
```
BUCKET_NAME=bucket.appspot.com;
GET_IMAGE_URL=https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/%s?alt\=media;
KEY_FILENAME=firebase.json
```
  **Nie zapomnij również umieścić pliku klucza prywatnego w src/main/resources/**

6. Dodaj konto gmail i hasło do pliku konfiguracyjnego application.properties lub do zmiennych środowiskowych intellij
7. Uruchom klasę główną BlogApplication.java w folderze src/main/java/com/pwgp/blog/
4. Aplikacja Spring Boot powinna zostać uruchomiona na domyślnym porcie 8080.

### Frontend (React)

1. Przejdź do folderu frontend przy użyciu terminala.
2. Wykonaj polecenie **'npm install'** w celu zainstalowania zależności.
3. Po zakończeniu instalacji, wykonaj polecenie **'npm start'** w celu uruchomienia aplikacji React.
4. Aplikacja powinna być dostępna pod adresem **'http://localhost:3000'**.
