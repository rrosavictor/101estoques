graph TB
    %% Personas
    User["<b>Usuario (Operador)</b><br/>[Person]<br/><br/>Usuário que gerencia estoques<br/>e aluguéis via interface web"]
    Admin["<b>Administrador</b><br/>[Person]<br/><br/>Monitora e configura o sistema"]

    %% Boundary do Sistema 101-Estoques
    subgraph SofI["<b>101-Estoques</b> [Software System]"]
        MFE["<b>Microfrontend React</b><br/>[Container: React + Vite]<br/><br/>Interface web usada pelos usuários<br/>para gerenciar estoques e aluguéis"]
        
        BFF["<b>BFF Node.js</b><br/>[Container: Node.js + Express]<br/><br/>Agrega APIs, expõe endpoints<br/>ao frontend e envia eventos"]
        
        MSEstoques["<b>Microservice - Estoques</b><br/>[Container: Node.js + MongoDB]<br/><br/>Gerencia estoque: CRUD,<br/>validações e regras de negócio"]
        
        MSAlugueis["<b>Microservice - Aluguéis</b><br/>[Container: Node.js + SQL]<br/><br/>Gerencia aluguéis e<br/>contratos de locação"]
        
        FuncEventos["<b>Function - Eventos</b><br/>[Container: Azure Function]<br/><br/>Processa eventos assíncronos<br/>e integra com outros serviços"]
    end

    %% Sistemas Externos
    MongoDB["<b>MongoDB Atlas</b><br/>[External System]<br/><br/>Banco de documentos para<br/>estoques e eventos"]
    
    AzureSQL["<b>Azure SQL / SQLite</b><br/>[External System]<br/><br/>Banco relacional<br/>para aluguéis"]
    
    Notifier["<b>SMTP / Notifier</b><br/>[External System]<br/><br/>Serviço de notificações"]

    %% Relações Usuários -> Containers
    User -->|"Usa / Interage com<br/>[HTTPS]"| MFE
    Admin -->|"Monitora operações<br/>[HTTPS]"| MFE

    %% Relações entre Containers
    MFE -->|"Chama API<br/>(agregação/proxy)<br/>[HTTPS/JSON]"| BFF
    BFF -->|"Requisições CRUD<br/>de estoques<br/>[HTTPS/JSON]"| MSEstoques
    BFF -->|"Requisições CRUD<br/>de aluguéis<br/>[HTTPS/JSON]"| MSAlugueis
    BFF -->|"Envia eventos de<br/>criação/alteração<br/>[HTTP -> Event API]"| FuncEventos
    FuncEventos -->|"Atualiza estoque<br/>(async)<br/>[HTTPS/JSON]"| MSEstoques

    %% Relações Containers -> External Systems
    MSEstoques -->|"Persiste estoques<br/>e eventos<br/>[MongoDB Driver]"| MongoDB
    MSAlugueis -->|"Persiste dados<br/>de aluguéis<br/>[Entity Framework/SQL]"| AzureSQL
    FuncEventos -->|"Lê eventos<br/>persistidos<br/>[MongoDB Driver]"| MongoDB
    FuncEventos -->|"Envia notificações<br/>[SMTP/HTTP]"| Notifier

    %% Estilos
    classDef person fill:#08427B,stroke:#052E56,color:#fff
    classDef container fill:#1168BD,stroke:#0B4884,color:#fff
    classDef external fill:#999999,stroke:#6B6B6B,color:#fff

    class User,Admin person
    class MFE,BFF,MSEstoques,MSAlugueis,FuncEventos container
    class MongoDB,AzureSQL,Notifier external