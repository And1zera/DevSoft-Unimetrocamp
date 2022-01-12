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
    public class BilheteController : ControllerBase
    {
        private readonly IBilheteService _bilheteService;
        private readonly IMapper _mapper;

        public BilheteController(IBilheteService bilheteService, IMapper mapper)
        {
            _bilheteService = bilheteService;
            _mapper = mapper;
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(200, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(Guid id)
        {

            var result = new GenericResult<BilheteDTO>();

            try
            {

                result.Result = _mapper.Map<BilheteDTO>(await _bilheteService.GetByIdAsync(id));

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
        [ProducesResponseType(200, Type = typeof(GenericResult<IEnumerable<BilheteDTO>>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<IEnumerable<BilheteDTO>>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAll()
        {

            var result = new GenericResult<IEnumerable<BilheteDTO>>();

            try
            {
                result.Result = _mapper.Map<IEnumerable<BilheteDTO>>(await _bilheteService.ListAllAsync());

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
        [ProducesResponseType(201, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(400, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> Post([FromBody] BilheteDTO model)
        {

            var result = new GenericResult<BilheteDTO>();

            try
            {

                model.UsuarioIdCriacao = Guid.Empty;

                result.Result = _mapper.Map<BilheteDTO>(await _bilheteService.CreateAsync(_mapper.Map<Bilhete>(model)));

                return CreatedAtAction(nameof(Post), new { id = result.Result.Id }, result.Result);

            }
            catch (Exception e)
            {

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde.", e.Message };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }

        }

        [HttpPut]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Put([FromBody] BilheteDTO model)
        {

            var result = new GenericResult<BilheteDTO>();

            try
            {
                model.UsuarioIdAlteracao = Guid.Empty;

                if (await _bilheteService.UpdateAsync(_mapper.Map<Bilhete>(model)))
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

        [HttpPut("trocar")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> PutTrocar([FromBody] BilheteDTO model)
        {

            var result = new GenericResult<BilheteDTO>();

            try
            {
                model.UsuarioIdAlteracao = Guid.Empty;

                if (await _bilheteService.TrocarAsync(_mapper.Map<Bilhete>(model)))
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

                result.Errors = new[] { "Ocorreu uma exceção ao executar a ação, tente novamente mais tarde." + e.Message };
                //Error.Register(_logger, e);
                return BadRequest(result);

            }

        }

        [HttpDelete("{senha}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(GenericResult<BilheteDTO>))]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(string senha)
        {

            var result = new GenericResult<BilheteDTO>();

            try
            {

                if (await _bilheteService.InactivateBySenha(senha, Guid.Empty))
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