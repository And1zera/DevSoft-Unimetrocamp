using System;
using System.Collections.Generic;

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

        public virtual ICollection<Bilhete> Bilhetes { get; set; } = new List<Bilhete>();
    }
}