# API

Questa api viene utilizzata per recuperare i progetti dal database

La versione pubblica di essa è disponibile all'indirizzo <br />
[https://2q-projects-backend.vercel.app](https://2q-projects-backend.vercel.app)

## Setup

La api utilizza come database mongodb.<br />
Puoi usare il tuo database con una stringa di connessione che puoi applicare al file 'config.js' (database > connectionString)

## ENV

Dal file example.env, creane un altro chiamato '.env', ma in quest'ultimo mettici le tue variabili di'ambiente

# Endpoints pubblici

## Recupera tutti i progetti

```http
  GET /getProjects
```

| Query parameter | Descrizione                                                       | Esempio          |
| :-------------- | :---------------------------------------------------------------- | :--------------- |
| `page`          | **Obbligatorio**. Specifica la pagina                             | `<URL>/?page=1`  |
| `q`             | **Facoltativo**. La query di ricerca                              | `<URL>/?q=ciao`  |
| `limit`         | **Facoltativo**. Limite di progetti per pagina. Valore massimo 12 | `<URL>/?limit=6` |

**Esempio di risposta**

```http
  GET /getProjects/?page=1&limit=6&q=Lampeggio
```

```json
{
  "success": true,
  "result": {
    "docs": [
      {
        "_id": "654456f39943d3ecc1537839",
        "name": "Lampeggio led variabile",
        "projectCreated": 1698451200000,
        "added": "2023-11-03T02:12:03.820Z",
        "__v": 0
      }
    ],
    "totalDocs": 1, // Totale di risultati su tuttle le pagine
    "limit": 6, // Limite di risultati
    "totalPages": 1, // Pagine totali
    "page": 1, // Pagina attuale
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
}
```

### Recupera un progetto

Ottieni i dati di un progetto

```http
  GET /project/<id_progetto>
```

**Esempio di risposta**

```http
  GET /project/654456f39943d3ecc1537839
```

```json
{
  "success": true,
  "result": {
    "metadata": {
      "name": "Lampeggio led variabile",
      "description": "Cambiare la frequenza del lampeggio del led modificando il valore del potenziometro",
      "createdAt": 1698451200,
      "icon": ""
    },
    "content": {
      "projectLink": "",
      "image": "",
      "iframe": "https://create.arduino.cc/editor/lea0o0oo/be00678a-2cdd-4e97-87f5-049abc43127f/preview?embed",
      "customHTML": "",
      "csv": "Nome,Quantità,Componente\n\"U1\",1,\" Arduino Uno R3\"\n\"D1\",1,\"Arancione LED\"\n\"R1\",1,\"220 Ω Resistenza\"\n\"Meter1\",1,\"Tensione Multimetro\"\n\"Rpot2\",1,\"0 kΩ Potenziometro\"\n"
    }
  }
}
```

# Endpoints per admin

## Crea un account

```http
  POST /account/register
```

**Parametri del corpo**
| Parametro | Tipo | Descrizione |
| :--------- | :------- | :-------------------------------- |
| `username` | `string` | **Obbligatorio**. Nome utente |
| `password` | `string` | **Obbligatorio**. Password utente |
| `adminKey` | `string` | **Obbligatorio**. Chiave admin |

**Esempio di risposta**
<br />
Per questo endpoint il server risponderà con il codice di stato `201`

## Login

```http
  POST /account/login
```

**Parametri del corpo**
| Parametro | Tipo | Descrizione |
| :--------- | :------- | :-------------------------------- |
| `username` | `string` | **Obbligatorio**. Nome utente |
| `password` | `string` | **Obbligatorio**. Password utente |

**Esempio di risposta**

```json
{
  "success": true,
  "token": "<token di accesso>"
}
```

## Controlla l'accesso

Questo route può essere utilizzato per controllare se la sessione attuale è scaduta o meno.

```http
  POST /account/checkJWT
```

**Intestazione di richiesta**
| Parametro | Tipo | Descrizione |
| :--------- | :------- | :-------------------------------- |
| `Authorization` | `Bearer` | **Obbligatorio**. Esempio: Bearer \<token> |

**Esempio di rispota**

```json
{
  "success": true
}
```

## Crea un progetto

```http
  POST /createProject
```

**Intestazione di richiesta**
| Parametro | Tipo | Descrizione |
| :--------- | :------- | :-------------------------------- |
| `Authorization` | `Bearer` | **Obbligatorio**. Esempio: Bearer \<token> |

**Parametri del corpo**

| Parametro     | Tipo     | Descrizione                         |
| :------------ | :------- | :---------------------------------- |
| `projectData` | `object` | **Obbligatorio**. Dati del progetto |

**Esempio di risposta** <br />
Per questo endpoint il server risponderà con il codice di stato `201`

#### Attenzione

projectData deve essere strutturato nel seguente modo:

```json
{
  "metadata": {
    "name": "Nome progetto",
    "description": "Descrizione progetto",
    "createdAt": 1234567890, // Timestamp in UNIX
    "icon": "icona codificata in Base64" // Può essere una stringa vuota
  },
  "content": {
    "projectLink": "Eventuali link del progetto",
    "image": "Immagine progetto codificata in Base64",
    "iframe": "Eventuali iframe",
    "customHTML": "Eventuale html custom",
    "csv": "Tabella CSV (come stringa)"
  }
}
```

Tutti i parametri nell'oggetto 'metadata' sono obbligatori, mentre quelli nell'oggetto 'content' possono essere delle stringhe vuote (non nulle!)

## Aggiorna un progetto

```http
  POST /updateProject
```

**Intestazione di richiesta**
| Parametro | Tipo | Descrizione |
| :--------- | :------- | :-------------------------------- |
| `Authorization` | `Bearer` | **Obbligatorio**. Esempio: Bearer \<token> |

| Parametro     | Tipo     | Descrizione                       |
| :------------ | :------- | :-------------------------------- |
| `projectId`   | `string` | **Obbligatorio**. Id del progetto |
| `projectData` | `object` | **Obbligatorio**. Nuovi dati      |

**Esempio di risposta**

```json
{
  "success": true
}
```

##### Attenzione

projectData deve essere strutturato nel seguente modo:

```json
{
  "metadata": {
    "name": "Nome progetto",
    "description": "Descrizione progetto",
    "createdAt": 1234567890, // Timestamp in UNIX
    "icon": "icona codificata in Base64" // Può essere una stringa vuota
  },
  "content": {
    "projectLink": "Eventuali link del progetto",
    "image": "Immagine progetto codificata in Base64",
    "iframe": "Eventuali iframe",
    "customHTML": "Eventuale html custom",
    "csv": "Tabella CSV (come stringa)"
  }
}
```

Tutti i parametri nell'oggetto 'metadata' sono obbligatori, mentre quelli nell'oggetto 'content' possono essere delle stringhe vuote (non nulle!)

## Elimina un progetto

```http
  DELETE /deleteProject
```

**Intestazione di richiesta**
| Parametro | Tipo | Descrizione |
| :--------- | :------- | :-------------------------------- |
| `Authorization` | `Bearer` | **Obbligatorio**. Esempio: Bearer \<token> |

**Parametri del corpo**

| Parametro   | Tipo     | Descrizione                                    |
| :---------- | :------- | :--------------------------------------------- |
| `projectId` | `string` | **Obbligatorio**. Id del progetto da eliminare |

**Esempio di risposta**

```JSON
{
  "success": true
}
```
