using System;

namespace Bilhet.Domain.Entities
{
    public class Bilhete : BaseEntity
    {
        public Guid EventoId { get; set; }
        public string RG { get; set; }
        public decimal Preco { get; set; }
        public string Senha { get; set; }


        public virtual Evento Evento { get; set; }
    }
}
