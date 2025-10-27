classDiagram
    %% Classes principais do Estoque Service
    
    class EstoqueController {
        -estoqueService: EstoqueService
        -validator: Validator
        +criar(req, res) Promise~Response~
        +listar(req, res) Promise~Response~
        +buscarPorId(req, res) Promise~Response~
        +atualizar(req, res) Promise~Response~
        +deletar(req, res) Promise~Response~
        +verificarDisponibilidade(req, res) Promise~Response~
    }
    
    class EstoqueService {
        -repository: EstoqueRepository
        -eventPublisher: EventPublisher
        -logger: Logger
        +criarEstoque(dto) Promise~Estoque~
        +listarEstoques(filtros) Promise~Estoque[]~
        +buscarPorId(id) Promise~Estoque~
        +atualizarEstoque(id, dto) Promise~Estoque~
        +deletarEstoque(id) Promise~boolean~
        +calcularDisponibilidade(id) Promise~number~
        -validarQuantidade(quantidade) void
        -verificarConflitos(estoqueId) Promise~boolean~
    }
    
    class EstoqueRepository {
        -mongoClient: MongoClient
        -collection: Collection
        +criar(estoque) Promise~Estoque~
        +buscarTodos(filtros) Promise~Estoque[]~
        +buscarPorId(id) Promise~Estoque~
        +atualizar(id, dados) Promise~Estoque~
        +deletar(id) Promise~boolean~
        +buscarPorCategoria(categoria) Promise~Estoque[]~
        +contarTotal(filtros) Promise~number~
    }
    
    class Estoque {
        +id: string
        +nome: string
        +descricao: string
        +categoria: string
        +quantidade: number
        +quantidadeReservada: number
        +unidade: string
        +valorUnitario: number
        +localizacao: string
        +dataAquisicao: Date
        +fornecedor: string
        +status: EstoqueStatus
        +createdAt: Date
        +updatedAt: Date
        +calcularDisponivel() number
        +reservar(quantidade) void
        +liberar(quantidade) void
        +validar() boolean
    }
    
    class EstoqueStatus {
        <<enumeration>>
        DISPONIVEL
        RESERVADO
        MANUTENCAO
        INATIVO
    }
    
    class CriarEstoqueDTO {
        +nome: string
        +descricao: string
        +categoria: string
        +quantidade: number
        +unidade: string
        +valorUnitario: number
        +localizacao: string
        +fornecedor: string
    }
    
    class AtualizarEstoqueDTO {
        +nome?: string
        +descricao?: string
        +quantidade?: number
        +valorUnitario?: number
        +localizacao?: string
        +status?: EstoqueStatus
    }
    
    class EventPublisher {
        -eventBus: EventEmitter
        +publicarEstoqueCriado(estoque) void
        +publicarEstoqueAtualizado(estoque) void
        +publicarEstoqueDeletado(id) void
        +publicarReservaRealizada(dados) void
    }
    
    class Validator {
        -schemas: Map~string, Schema~
        +validarCriarEstoque(dto) ValidationResult
        +validarAtualizarEstoque(dto) ValidationResult
        +validarQuantidade(quantidade) boolean
        +validarId(id) boolean
    }
    
    class Logger {
        +info(mensagem, metadata) void
        +error(mensagem, erro) void
        +warn(mensagem, metadata) void
        +debug(mensagem, metadata) void
    }
    
    class EstoqueError {
        <<exception>>
        +message: string
        +code: string
        +statusCode: number
    }
    
    class EstoqueNaoEncontradoError {
        <<exception>>
    }
    
    class QuantidadeInsuficienteError {
        <<exception>>
    }
    
    class ValidacaoError {
        <<exception>>
    }
    
    %% Relacionamentos
    EstoqueController --> EstoqueService : usa
    EstoqueController --> Validator : valida com
    EstoqueService --> EstoqueRepository : persiste via
    EstoqueService --> EventPublisher : publica eventos
    EstoqueService --> Logger : registra logs
    EstoqueRepository --> Estoque : retorna
    EstoqueService --> Estoque : manipula
    Estoque --> EstoqueStatus : possui
    EstoqueController --> CriarEstoqueDTO : recebe
    EstoqueController --> AtualizarEstoqueDTO : recebe
    EstoqueService --> EstoqueError : lança
    EstoqueError <|-- EstoqueNaoEncontradoError : herda
    EstoqueError <|-- QuantidadeInsuficienteError : herda
    EstoqueError <|-- ValidacaoError : herda
    
    %% Notas
    note for EstoqueService "Camada de lógica de negócio\nImplementa validações complexas\ne coordena operações"
    
    note for EstoqueRepository "Camada de acesso a dados\nAbstrai MongoDB\nImplementa queries otimizadas"
    
    note for Estoque "Entidade de domínio\nContém regras de negócio\ne validações básicas"