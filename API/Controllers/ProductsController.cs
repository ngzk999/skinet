using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _brandsRepo;
        private readonly IGenericRepository<ProductType> _typesRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> brandsRepo,
            IGenericRepository<ProductType> typesRepo, IMapper mapper)
        {
            _mapper = mapper;
            _typesRepo = typesRepo;
            _brandsRepo = brandsRepo;
            _productsRepo = productsRepo;

        } // end of constructor

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

            var products = await _productsRepo.ListAsync(spec);

            // var productsToReturn = products.Select(product => new ProductToReturnDto
            // {
            //     Id = product.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     Price = product.Price,
            //     PictureUrl = product.PictureUrl,
            //     ProductType = product.ProductType.Name,
            //     ProductBrand = product.ProductBrand.Name
            // }).ToList();
            
            // Map<Dest>(Source)
            var productsToReturn = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(productsToReturn);

        } // end of GetProducts()

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsWithTypesAndBrandsSpecification(id));

            if (product == null)
                return NotFound(new ApiResponse(404));

            // Map<Dest>(Source)
            var productToReturn = _mapper.Map<ProductToReturnDto>(product);

            return Ok(productToReturn);

        } // end of GetProduct()

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _brandsRepo.ListAllAsync());

        } // end of GetBrands()

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            return Ok(await _typesRepo.ListAllAsync());

        } // end of GetTypes()

    } // end of ProductsController class
}