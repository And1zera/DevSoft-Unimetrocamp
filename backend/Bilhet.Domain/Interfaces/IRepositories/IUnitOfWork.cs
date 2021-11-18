using System;

namespace Bilhet.Domain.Interfaces.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IEventoRepository EventoRepository { get; }
        IBilheteRepository BilheteRepository { get; }
        IUsuarioRepository UsuarioRepository { get; }
        IFidelidadeRepository FidelidadeRepository { get; }

        bool Commit();
    }
}
