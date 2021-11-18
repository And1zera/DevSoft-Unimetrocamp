using System;

namespace Bilhet.Domain.Entities
{
    public class FidelidadeDTO
    {
        public Guid UsuarioId { get; set; }
        public Guid BilheteId { get; set; }
        public int Pontos { get; set; }

        public virtual Usuario Usuario { get; set; }
        public virtual Bilhete Bilhete { get; set; }
    }
}
