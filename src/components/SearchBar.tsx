
import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

type SearchBarProps = {
  onSearch: (query: string, filters: any) => void;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: {
      Technology: false,
      Finance: false,
      Healthcare: false,
      Retail: false,
      Manufacturing: false,
      Consulting: false,
    },
    showPrivate: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch('', filters);
  };

  const toggleCategoryFilter = (category: string) => {
    setFilters({
      ...filters,
      categories: {
        ...filters.categories,
        [category]: !filters.categories[category as keyof typeof filters.categories],
      },
    });
  };

  const togglePrivateFilter = () => {
    setFilters({
      ...filters,
      showPrivate: !filters.showPrivate,
    });
  };

  return (
    <motion.div 
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="block w-full py-2.5 pl-10 pr-20 rounded-l-md bg-white border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Search businesses, categories, or keywords..."
          />
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="rounded-none border-l-0 border-r-0 h-[42px]"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.keys(filters.categories).map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.categories[category as keyof typeof filters.categories]}
                onCheckedChange={() => toggleCategoryFilter(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.showPrivate}
              onCheckedChange={togglePrivateFilter}
            >
              Show Private Listings
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          type="submit"
          className="h-[42px] rounded-l-none px-4"
        >
          Search
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
