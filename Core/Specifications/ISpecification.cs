using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        // Func<Type, return type>
        Expression<Func<T, bool>> Criteria {get;} // the criteria for WHERE clause
        List<Expression<Func<T, object>>> Include {get;}
        Expression<Func<T, object>> OrderBy {get;}
        Expression<Func<T, object>> OrderByDesc {get;}
        int Take {get;}
        int Skip {get;}
        bool IsPagingEnabled {get;}
    }
}