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
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IMapper _mapper;

        public UsuarioController(IUsuarioService usuarioService, IMapper mapper)
        {
            _usuarioService = usuarioService;
            _mapper = mapper;
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(200, Type = typeof(GenericResult<UsuarioDTO>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<UsuarioDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(Guid id)
        {

            var result = new GenericResult<UsuarioDTO>();

            try
            {

                result.Result = _mapper.Map<UsuarioDTO>(await _usuarioService.GetByIdAsync(id));

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
        [ProducesResponseType(200, Type = typeof(GenericResult<IEnumerable<UsuarioDTO>>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<IEnumerable<UsuarioDTO>>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAll()
        {

            var result = new GenericResult<IEnumerable<UsuarioDTO>>();

            try
            {

                result.Result = _mapper.Map< IEnumerable<UsuarioDTO>>(await _usuarioService.ListAsync(x => x.Ativo));

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
        [ProducesResponseType(201, Type = typeof(GenericResult<UsuarioDTO>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<UsuarioDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult Post([FromBody] UsuarioDTO model)
        {

            var result = new GenericResult<UsuarioDTO>();

            try
            {

                model.UsuarioIdCriacao = Guid.Empty;

                result.Result = _mapper.Map<UsuarioDTO>(_usuarioService.Create(_mapper.Map<Usuario>(model)));

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
        [ProducesResponseType(400, Type = typeof(GenericResult<UsuarioDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Put([FromBody] UsuarioDTO model)
        {

            var result = new GenericResult<UsuarioDTO>();

            try
            {
                model.UsuarioIdAlteracao = Guid.Empty;

                if (await _usuarioService.UpdateAsync(_mapper.Map<Usuario>(model)))
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
        [ProducesResponseType(400, Type = typeof(GenericResult<UsuarioDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(Guid id)
        {

            var result = new GenericResult<UsuarioDTO>();

            try
            {

                if (await _usuarioService.Inactivate(id, Guid.Empty))
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