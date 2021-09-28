using System;

namespace Bilhet.Domain.Interfaces.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IEventoRepository EventoRepository { get; }

        bool Commit();
    }
}
