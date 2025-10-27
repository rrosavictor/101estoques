graph TB
    %% Personas
    Usuario["<b>Usuario (Operador)</b><br/>[Person]<br/><br/>Usuário que usa a interface web<br/>para consultar/gerenciar estoques<br/>e aluguéis"]
    Admin["<b>Administrador</b><br/>[Person]<br/><br/>Gerencia configurações do sistema<br/>e monitora operações"]

    %% Sistema Principal
    SofI["<b>101-Estoques</b><br/>[Software System]<br/><br/>Plataforma composta por microserviços,<br/>BFF e funções que gerenciam inventário<br/>e aluguéis; expõe APIs REST e eventos"]

    %% Sistemas Externos
    Frontend["<b>Microfrontend (Web UI)</b><br/>[External System]<br/><br/>Interface web responsiva que consome<br/>APIs do BFF para operações de<br/>estoques e aluguéis"]
    
    MongoDB["<b>MongoDB Atlas</b><br/>[External System]<br/><br/>Banco de documentos usado pelo<br/>microservice de estoques e para<br/>persistência de eventos"]
    
    AzureSQL["<b>Azure SQL / SQLite</b><br/>[External System]<br/><br/>Banco relacional usado pelo microservice<br/>de aluguéis em produção;<br/>em dev usamos SQLite"]
    
    AzureFunctions["<b>Azure Functions</b><br/>[External System]<br/><br/>Plataforma serverless para execução<br/>assíncrona de processamento<br/>de eventos"]
    
    Notifier["<b>SMTP / Notifier</b><br/>[External System]<br/><br/>Serviço de envio de notificações<br/>e emails para usuários"]

    %% Relações - Usuários para Sistema
    Usuario -->|"Usa UI web para gerenciar<br/>estoques e aluguéis"| Frontend
    Admin -->|"Monitora operações e<br/>configura sistema"| Frontend
    Frontend -->|"Consome APIs REST<br/>[HTTPS/JSON]"| SofI

    %% Relações - Sistema para Externos
    SofI -->|"Persiste estoques e eventos<br/>[MongoDB Driver]"| MongoDB
    SofI -->|"Persiste dados de aluguéis<br/>[Entity Framework]"| AzureSQL
    SofI -->|"Envia eventos para<br/>processamento assíncrono<br/>[Azure Queue]"| AzureFunctions
    SofI -->|"Envia notificações<br/>[SMTP/HTTP]"| Notifier
    
    AzureFunctions -->|"Lê eventos persistidos<br/>[MongoDB Driver]"| MongoDB

    %% Estilos
    classDef person fill:#08427B,stroke:#052E56,color:#fff
    classDef system fill:#1168BD,stroke:#0B4884,color:#fff
    classDef external fill:#999999,stroke:#6B6B6B,color:#fff

    class Usuario,Admin person
    class SofI system
    class Frontend,MongoDB,AzureSQL,AzureFunctions,Notifier external