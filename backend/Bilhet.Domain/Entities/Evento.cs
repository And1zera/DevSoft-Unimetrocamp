using System;

namespace Bilhet.Domain.Entities
{
    public class Evento : BaseEntity
    {
        public string Titulo { get; set; }
        public decimal Preco { get; set; }
        public int QtdIngresso { get; set; }
        public string URLImage { get; set; }
        public DateTime Data { get; set; }
        public string Endereco { get; set; }
    }
}