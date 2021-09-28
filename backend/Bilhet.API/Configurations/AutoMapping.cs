using AutoMapper;
using Bilhet.API.Views.DTOs;
using Bilhet.Domain.Entities;

namespace Bilhet.API.Configurations
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {

            CreateMap<EventoDTO, Evento>().ReverseMap();
             
        }
    }
}