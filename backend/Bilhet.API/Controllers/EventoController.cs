using AutoMapper;
using Bilhet.API.ViewModel.Responses;
using Bilhet.API.Views.DTOs;
using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bilhet.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoService;
        private readonly IMapper _mapper;

        public EventoController(IEventoService eventoService, IMapper mapper)
        {
            _eventoService = eventoService;
            _mapper = mapper;
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(200, Type = typeof(GenericResult<EventoDTO>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<EventoDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(Guid id)
        {

            var result = new GenericResult<EventoDTO>();

            try
            {

                result.Result = _mapper.Map<EventoDTO>(await _eventoService.GetByIdAsync(id));

                if (result.Result == null)
                    return NotFound();
                else
                    return Ok(result);

            }
            catch (Exception e)
            {

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde." };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }
        }
        
        [HttpGet("listall")]
        [ProducesResponseType(200, Type = typeof(GenericResult<IEnumerable<EventoDTO>>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<IEnumerable<EventoDTO>>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAll()
        {

            var result = new GenericResult<IEnumerable<EventoDTO>>();

            try
            {

                result.Result = _mapper.Map< IEnumerable<EventoDTO>>(await _eventoService.ListAsync(x => x.Ativo));

                if (result.Result == null)
                    return NotFound();
                else
                    return Ok(result);

            }
            catch (Exception e)
            {

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde." };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(GenericResult<EventoDTO>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<EventoDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult Post([FromBody] EventoDTO model)
        {

            var result = new GenericResult<EventoDTO>();

            try
            {

                model.UsuarioIdCriacao = Guid.Empty;

                result.Result = _mapper.Map<EventoDTO>(_eventoService.Create(_mapper.Map<Evento>(model)));

                return CreatedAtAction(nameof(Post), new { id = result.Result.Id }, result.Result);

            }
            catch (Exception e)
            {

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde." };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }

        }

        [HttpPut]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(GenericResult<EventoDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Put([FromBody] EventoDTO model)
        {

            var result = new GenericResult<EventoDTO>();

            try
            {
                model.UsuarioIdAlteracao = Guid.Empty;

                if (await _eventoService.UpdateAsync(_mapper.Map<Evento>(model)))
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception e)
            {

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde." };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }

        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(GenericResult<EventoDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(Guid id)
        {

            var result = new GenericResult<EventoDTO>();

            try
            {

                if (await _eventoService.Inactivate(id, Guid.Empty))
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception e)
            {

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde." };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }

        }
    }
}