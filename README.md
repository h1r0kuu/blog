# Dokumentacja Projektu: Blog z wykorzystaniem Spring Boot i React

---

## Spis treści

* [1. Wzorzec architektoniczny](#1-wzorzec-architektoniczny)
* [2. Wykorzystane technologie i narzędzia](#2-wykorzystane-technologie-i-narzdzia)
   + [Backend (Spring Boot)](#backend-spring-boot)
   + [Frontend (React)](#frontend-react)
* [3. Realizacja projektu](#3-realizacja-projektu)
* [4. Napotkane problemy i rozwiązania](#4-napotkane-problemy-i-rozwizania)
* [5. Środowisko uruchomieniowe](#5-rodowisko-uruchomieniowe)
* [6. Instrukcje uruchomienia](#6-instrukcje-uruchomienia)
   + [Backend (Spring Boot)](#backend-spring-boot-1)
   + [Frontend (React)](#frontend-react-1)

<!-- TOC end -->

---

<!-- TOC --><a name="1-wzorzec-architektoniczny"></a>
## 1. Wzorzec architektoniczny

Projekt został zrealizowany w oparciu o wzorzec MVC (Model-View-Controller). W naszej implementacji warstwa Model jest reprezentowana przez encje i repozytoria w Spring Boot, które odpowiadają za przechowywanie i zarządzanie danymi aplikacji. Warstwa View została zaimplementowana przy użyciu komponentów React w części frontendowej, zapewniając dynamiczny i responsywny interfejs użytkownika. Warstwa Controller jest realizowana przez kontrolery REST w Spring Boot, które pośredniczą w komunikacji między warstwą Model a View.

<!-- TOC --><a name="2-wykorzystane-technologie-i-narzdzia"></a>
## 2. Wykorzystane technologie i narzędzia

<!-- TOC --><a name="backend-spring-boot"></a>
### Backend (Spring Boot)

W warstwie backendowej jest wykorzystano Spring Boot jako główny framework. Do generowania podstawowej struktury projektu wykorzystano Spring Initializr, który znacząco przyspieszył proces początkowej konfiguracji. 

Generowanie komponentów w aplikacji wspierane jest przez szereg narzędzi. Spring Data JPA automatycznie tworzy repozytoria na podstawie zdefiniowanych encji, znacząco redukując ilość kodu boilerplate. Aplikacja wykorzystuje ModelMapper do automatycznego mapowania między obiektami DTO a encjami, co upraszcza proces transformacji danych. Lombok generuje gettery, settery i konstruktory, eliminując potrzebę ręcznego pisania tego kodu.

Routing HTTP realizowany jest przez Spring Web MVC, gdzie kontrolery REST definiują endpointy aplikacji. Dokumentacja API jest automatycznie generowana dzięki SpringDoc OpenAPI, który dostarcza interfejs Swagger UI do interaktywnego przeglądania i testowania endpoints. Bezpieczeństwo zapewnia Spring Security wraz z JWT do autoryzacji bazującej na tokenach.

Warstwa dostępu do danych opiera się na Spring Data JPA z Hibernate jako implementacją JPA. PostgreSQL służy jako główna baza danych, a komunikacja z nią jest abstrakcyjna dzięki interfejsom repozytoriów. Dodatkowo, aplikacja wykorzystuje Firebase Admin SDK do zarządzania przechowywaniem plików w chmurze.

Aplikacja wykorzystuje Gmail SMTP do wysyłania powiadomień email, gdzie szablony wiadomości są generowane przy użyciu Thymeleaf.

Do testów jednostkowych aplikacja wykorzystuje JUnit, który wraz ze Spring Boot Test zapewnia kompleksowe środowisko testowe dla naszej aplikacji.

<!-- TOC --><a name="frontend-react"></a>
### Frontend (React)

Frontend aplikacji został zbudowany przy użyciu React z TypeScript, wykorzystując nowoczesne podejście oparte na komponentach funkcyjnych i hookach. Zastosowanie TypeScript pozwoliło na lepszą kontrolę typów, co znacząco zmniejszyło ilość potencjalnych błędów podczas rozwoju aplikacji.

**Interfejs użytkownika:**

-   Material-UI (MUI) służy jako główna biblioteka komponentów, dostarczając spójny i profesjonalny wygląd aplikacji
-   Wykorzystano zaawansowane komponenty MUI, takie jak `@mui/lab` do bardziej złożonych elementów interfejsu
-   Ikony z `@mui/icons-material` zapewniają spójną identyfikację wizualną
-   Bootstrap wspiera dodatkowe style i układ strony

**Zarządzanie formularzami i walidacja:**

-   `react-hook-form` do efektywnego zarządzania stanami formularzy i ich walidacji
-   Integracja z `@hookform/resolvers` i `yup` zapewnia zaawansowaną walidację danych wejściowych
-   Własne hooki React optymalizują logikę formularzy i zmniejszają powtarzalność kodu

**Zarządzanie stanem i routing:**

-   Wykorzystanie Context API do zarządzania globalnym stanem aplikacji
-   `react-router-dom` zapewnia zaawansowane możliwości routingu i nawigacji
-   Implementacja lazy loading dla optymalizacji wydajności ładowania komponentów

**Komunikacja z API:**

-   Axios do komunikacji HTTP z backendem
-   Własne interceptory do obsługi błędów i tokenów autoryzacyjnych
-   Wykorzystanie `qs` do efektywnego parsowania parametrów URL

**Dodatkowe funkcjonalności:**

-   `date-fns` do zaawansowanej manipulacji i formatowania dat
-   Editor WYSIWYG z wykorzystaniem `draftjs-to-html` do formatowania treści

<!-- TOC --><a name="3-realizacja-projektu"></a>
## 3. Realizacja projektu

Projekt powstał jako praca zespołowa w ramach przedmiotu "Studium przypadku - programowanie w grupie programistycznej". Nasza trzyosobowa grupa zdecydowała się na wykorzystanie Spring Boot i React ze względu na ich popularność w branży, rozbudowaną dokumentację oraz aktywne wsparcie społeczności. Dodatkowo, oba frameworki oferują świetne możliwości skalowania aplikacji oraz łatwą integrację z zewnętrznymi serwisami.

<!-- TOC --><a name="4-napotkane-problemy-i-rozwizania"></a>
## 4. Napotkane problemy i rozwiązania

W trakcie realizacji projektu napotkaliśmy szereg istotnych wyzwań technicznych i organizacyjnych, które wymagały przemyślanych rozwiązań i ścisłej współpracy zespołu.

Jednym z pierwszych wyzwań było bezpieczne przechowywanie danych uwierzytelniających, takich jak klucze API, hasła i inne wrażliwe informacje. Problem rozwiązaliśmy poprzez implementację systemu zmiennych środowiskowych w IntelliJ IDEA, co pozwoliło na bezpieczne zarządzanie tymi danymi bez ich ekspozycji w kodzie źródłowym.

Istotnym wyzwaniem okazała się również komunikacja między frontendem a backendem. Początkowo napotykaliśmy problemy z polityką CORS, która blokowała żądania między aplikacjami działającymi na różnych portach. Rozwiązaniem było staranne skonfigurowanie odpowiednich nagłówków CORS w Spring Boot oraz implementacja interceptorów w Axios do prawidłowej obsługi tokenów JWT.

Wraz z rozwojem aplikacji pojawiły się wyzwania związane z wydajnością, szczególnie przy większej ilości danych. Rozwiązaniem było wprowadzenie paginacji dla list postów.

Dużo uwagi poświęciliśmy walidacji formularzy, która musiała działać spójnie zarówno po stronie frontendu, jak i backendu. Na frontendzie wykorzystano połączenie react-hook-form z Yup, podczas gdy na backendzie zaimplementowaliśmy własne adnotacje walidacyjne w połączeniu z Bean Validation. To podejście zapewniło dokładną kontrolę wprowadzanych danych na obu poziomach aplikacji.

System powiadomień email również wymagał dopracowania. W aplikacji Thymeleaf służy do tworzenia atrakcyjnych wizualnie szablonów email.

Te wszystkie wyzwania, choć początkowo trudne, pozwoliły nam nie tylko znaleźć skuteczne rozwiązania techniczne, ale również nauczyły nas lepszej komunikacji zespołowej i systematycznego podejścia do rozwiązywania problemów.

<!-- TOC --><a name="5-rodowisko-uruchomieniowe"></a>
## 5. Środowisko uruchomieniowe

Do uruchomienia aplikacji niezbędne jest środowisko zawierające:

* Java 21
* Node.js
* PostgreSQL
* Konto Firebase
* Konto Gmail

<!-- TOC --><a name="6-instrukcje-uruchomienia"></a>
## 6. Instrukcje uruchomienia

<!-- TOC --><a name="backend-spring-boot-1"></a>
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
8. Aplikacja Spring Boot powinna zostać uruchomiona na domyślnym porcie 8080.

<!-- TOC --><a name="frontend-react-1"></a>
### Frontend (React)

1. Przejdź do folderu frontend przy użyciu terminala.
2. Wykonaj polecenie **'npm install'** w celu zainstalowania zależności.
3. Po zakończeniu instalacji, wykonaj polecenie **'npm start'** w celu uruchomienia aplikacji React.
4. Aplikacja powinna być dostępna pod adresem **'http://localhost:3000'**.
