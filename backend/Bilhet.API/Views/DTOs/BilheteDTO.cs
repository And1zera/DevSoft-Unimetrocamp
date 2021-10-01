using System;

namespace Bilhet.API.Views.DTOs
{
    public class BilheteDTO : BaseDTO
    {
        public Guid EventoId { get; set; }
        public string RG { get; set; }
        public decimal Preco { get; set; }
        public string Senha { get; set; }


        public virtual EventoDTO Evento { get; set; }
    }
}
