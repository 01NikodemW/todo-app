# Todo app

## Uruchomienie programu

<!-- ### Backend -->

1.  **Backend**

    Aby przygotować bazę danych, najłatwiej użyć obrazu dockerowego za pomocą poniższego polecenia:

    ```sh
    docker run --name my-postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
    ```

    Następnie należy ustawić zmienne środowiskowe w pliku todo-backend/.env odpowiedzialne za połączenie z bazą danych (na potrzeby zadania ustawiłem je z góry więc ten krok postępując zgodnie z instrukcją można pominąć)

    Na koniec należy w przejść do katalogu todo-backend, zainstalować wymagane zależności

    ```sh
    npm i
    ```

    oraz uruchomić backend

    ```sh
    npm start
    ```

    Wchodząc pod adres http://localhost:3000/api wyświetli name się dokumentacja do projektu

<!-- ### Mobile -->

2.  **Mobile**

    Na wstępie należy ustawić zmienną środowiskową w pliku todo-mobile/.env na adres na którym będzie działać API, w moim przypadku jest to

    ```sh
    EXPO_PUBLIC_API_URL=http://192.168.1.17:3000
    ```

    Następnie należy przejść do katalogu todo-mobile, zainstalować wymagane zależności

    ```sh
    npm i
    ```

    oraz uruchomić aplikację mobilną

    ```sh
    npm start
    ```

# Działanie aplikacji

Do projektu zamieszczam nagranie prezentujące działanie wszystkich wymaganych funkcjonalności z poziomu aplikacji mobilnej
[Demo video](demo.mp4)

# Proces tworzenia

Moją pracę rozpocząłem od stworzenia backendu. Utworzyłem bazowy projekt w Nest.js. Następnej przeszedłem do stworzenia bazy danych, w tym celu za pomocą Prisma utworzyłem klasę Task określającą pola jakie ma zawierać dany task. W kolejnym kroku przeszedłem to tworzenia wymaganych routingow. Utworzyłem w projekcie katalog tasks, gdzie znajduje sie kontroler, serwis oraz walidacja wykonywanych zapytań. Zadbałem o sprawdzenie czy zasób do którego chcemy sie odwołać po ID istnieje oraz czy podczas tworzenia zasobu zostały podane wszystkie wymagane parametry. W przypadku gdy któreś z wymagań nie zostało spełnione z backendu zostanie wysłana odpowiednia zwrotka zawierająca informacje o błędzie w celu prezentacji jej użytkownikowi.
Na koniec wykorzystując swggera stworzyłem dokumentacje mojego api aby ułatwić pracę osobą z niego korzystającym.

Kolejnym krokiem było stworzenie aplikacji mobilnej. W tym celu utworzyłem nowy projekt Expo. W części mobilnej również wykorzystałem Typescripta aby zapewnić lepszą kontrolę nad typami danych. Następnie utworzyłem połączenie z backendem. W tym celu wykorzystałem takie biblioteki @tanstack/react-query i axios żeby zapewnić dobrą organizację kodu oraz wygodę z korzystania. Każdy mój routing opakowany został w customowy hook który zwraca dane wraz z informacją czy są pobierane z bazy albo umożliwiający wykonanie zadania separując cały kod odpowiedzialny za kontakt z api od kodu odpowiedzialnego za tworzenie UI aplikacji.

Następnie przeszedłem do tworzenia widoków z naciskiem na to by realizowały wszystkie wymagania biznesowe oraz były intuicyjne i responsywne.

Przykładem intuicyjności jaką chciałem nadać aplikacji jest przeciągnięcie wybranego taska w lewo w celu oznaczenia go jako zrealizowany. Uznałem że jest to prosty i wygodny gest dla użytkownika

Wykonując aplikacje mobilną testowałem ją na emulatorze IOS i Androida oraz za pomocą aplikacji Expo Go, którą mam zainstalowaną na moim telefonie i tablecie.

Ważne dla mnie było by aplikacja dobrze działała na obu platformach i dla urządzeń o rożnej wielkości
￼
