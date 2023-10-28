# API

Questa api viene utilizzata per recuperare i progetti dal database

## Setup

La api utilizza come database mongodb
Puoi usare il tuo database con una stringa di connessione che puoi applicare al file 'config.js' (database > connectionString)

## ENV

Dal file example.env, creane un altro chiamato '.env', ma in quest'ultimo mettici le tue variabili di'ambiente

## Endpoints

#### Recupera tutti i progetti

```http
  GET /getProjects
```

| Query parameter | Descrizione                           | Esempio                                         |
| :--------       |:-------------------------             | :---------------------------------------------- |
| `page`          | **Obbligatorio**. Specifica la pagina | `<URL>/?page=1`                                 |

#### Crea un account

```http
  GET /account/register
```

| Parametro | Tipo     | Descrizione                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**. Nome utente         |
| `password`| `string` | **Required**. Password utente     |
| `adminKey`| `string` | **Required**. Chiave admin        |

#### Login

```http
  GET /account/login
```

| Parametro | Tipo     | Descrizione                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**. Nome utente         |
| `password`| `string` | **Required**. Password utente     |