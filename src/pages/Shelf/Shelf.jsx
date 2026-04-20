import React, { useState } from 'react';
import BookModal from '../../components/modals/BookModal';
import MovieModal from '../../components/modals/MovieModal';
import shelfData from '../../data/shelf.json';
import { BookOpen, Film, Play, Star, Search } from 'lucide-react';

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const BOOKS_PER_SHELF = 6;
const MOVIES_PER_SCROLL_ROW = 15;

const Shelf = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Books Pagination State
  const [visibleShelves, setVisibleShelves] = useState(1);
  const chunkedBooks = chunkArray(shelfData.books, BOOKS_PER_SHELF);

  // Movies Search and Pagination State
  const [movieSearch, setMovieSearch] = useState('');
  const filteredMovies = shelfData.movies.filter(m => 
    m.title.toLowerCase().includes(movieSearch.toLowerCase())
  );
  const chunkedMovies = chunkArray(filteredMovies, MOVIES_PER_SCROLL_ROW);

  const renderShelfBoard = () => (
    <div className="w-full max-w-5xl mx-auto relative z-0 mt-0">
      <div className="h-6 md:h-8 w-full relative rounded-b-sm overflow-hidden shadow-[0_20px_30px_rgba(0,0,0,0.15)] bg-[#f6d7d9]">
        {/* hyper-realistic wooden plank stock image */}
        <img 
          src="https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Wooden Shelf Texture" 
          className="w-full h-full object-cover mix-blend-multiply opacity-40 brightness-110 saturate-50"
        />
        {/* Shelf top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/50"></div>
        {/* Shelf bottom ambient occlusion */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      {/* Drop shadow on the wall below shelf */}
      <div className="absolute top-6 left-6 right-6 h-8 bg-[#4a3551]/10 blur-xl rounded-full -z-10"></div>
    </div>
  );

  // Pagination for Books inside the Modal
  const handleNextBook = () => {
    if (!selectedBook) return;
    const currentIndex = shelfData.books.findIndex(b => b.id === selectedBook.id);
    if (currentIndex < shelfData.books.length - 1) {
      setSelectedBook(shelfData.books[currentIndex + 1]);
    }
  };

  const handlePrevBook = () => {
    if (!selectedBook) return;
    const currentIndex = shelfData.books.findIndex(b => b.id === selectedBook.id);
    if (currentIndex > 0) {
      setSelectedBook(shelfData.books[currentIndex - 1]);
    }
  };

  const hasNextBook = selectedBook && shelfData.books.findIndex(b => b.id === selectedBook.id) < shelfData.books.length - 1;
  const hasPrevBook = selectedBook && shelfData.books.findIndex(b => b.id === selectedBook.id) > 0;

  return (
    <main className="flex-1 w-full min-h-screen z-20 pb-24 relative overflow-x-hidden pt-24 md:pt-32">
      
      {/* --- BOOKS SECTION --- */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-24 relative">
        <div className="flex items-center gap-3 mb-10 pl-4 md:pl-10">
          <BookOpen className="text-brand-accent w-8 h-8 md:w-10 md:h-10 opacity-80" />
          <h2 className="font-caveat text-4xl md:text-6xl font-bold tracking-wider text-brand-text drop-shadow-sm">Books</h2>
          <div className="h-[1px] flex-1 bg-brand-text/10 ml-4"></div>
        </div>

        {/* Dynamic Folded Shelves */}
        {chunkedBooks.slice(0, visibleShelves).map((shelfChunk, shelfIndex) => (
          <div key={shelfIndex} className="mb-14">
            <div className="relative w-full max-w-5xl mx-auto flex justify-center items-end gap-1 md:gap-3 px-8 z-10 min-h-[200px] md:min-h-[280px]">
              
              {shelfChunk.map((book) => (
                <div 
                  key={book.id} 
                  onClick={() => setSelectedBook(book)}
                  className="group relative cursor-pointer hover:-translate-y-4 transition-transform duration-300 ease-out origin-bottom"
                >
                  <div 
                    className="w-14 items-center justify-center flex h-48 md:w-20 md:h-72 rounded-sm relative overflow-hidden"
                    style={{ backgroundColor: book.coverColor, color: book.textColor }}
                  >
                    {/* 3D Spine effect borders */}
                    <div className="absolute inset-0 shadow-[inset_6px_0_15px_rgba(0,0,0,0.15),inset_-3px_0_6px_rgba(255,255,255,0.2)] pointer-events-none"></div>
                    
                    {/* Texture overlay for spine realism */}
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>

                    {/* Vertical text layout */}
                    <span className="font-serif text-sm md:text-lg font-bold tracking-[0.1em] uppercase whitespace-nowrap transform -rotate-90 select-none transition-opacity text-center w-full">
                      {book.title}
                    </span>

                    {/* Spine details / author at the bottom */}
                    <span className="absolute bottom-4 transform -rotate-90 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                      {book.author}
                    </span>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-text text-brand-bg text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none hidden md:block">
                    Open Book
                  </div>
                </div>
              ))}

            </div>
            {renderShelfBoard()}
          </div>
        ))}

        {visibleShelves < chunkedBooks.length && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setVisibleShelves(v => v + 1)}
              className="px-6 py-3 glassmorphism bg-white/40 text-brand-text font-bold uppercase tracking-widest text-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white/60 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Load More Shelves
            </button>
          </div>
        )}
      </section>

      {/* --- MOVIES SECTION --- */}
      <section className="w-full max-w-6xl mx-auto px-4 relative mt-16 md:mt-24">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pl-4 md:pl-10">
          <div className="flex items-center gap-3">
            <Film className="text-brand-accent w-8 h-8 md:w-10 md:h-10 opacity-80" />
            <h2 className="font-caveat text-4xl md:text-6xl font-bold tracking-wider text-brand-text drop-shadow-sm">Movies</h2>
            <div className="h-[1px] w-12 bg-brand-text/10 ml-4 hidden md:block"></div>
          </div>
          
          <div className="relative w-full md:w-72 mt-2 md:mt-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40" size={18} />
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={movieSearch}
              onChange={(e) => setMovieSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/20 dark:bg-black/20 border border-brand-text/10 rounded-full outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/40 text-sm font-semibold tracking-wide"
            />
          </div>
        </div>

        {/* Movies Rows */}
        {chunkedMovies.length > 0 ? chunkedMovies.map((movieChunk, rowIndex) => (
          <div key={rowIndex} className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-6">
            <div className="w-full max-w-6xl mx-auto px-4 md:px-10">
              <div className="flex overflow-x-auto gap-6 md:gap-10 pb-8 pt-4 px-4 snap-x snap-mandatory custom-scrollbar">
                
                {movieChunk.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className="snap-center shrink-0 w-[120px] md:w-[140px] group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:-translate-y-1 border border-brand-text/5 bg-black">
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                         <span className="px-3 py-1.5 glassmorphism bg-white/20 text-white border-white/30 rounded-full font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
                           <Play size={12} fill="white" /> Review
                         </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center px-1">
                      <h3 className="font-bold text-sm md:text-base text-brand-text leading-tight mb-1 truncate">{movie.title}</h3>
                      <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-semibold opacity-60">
                        <span>{movie.year}</span>
                        <span className="text-brand-accent">•</span>
                        <span className="flex items-center text-yellow-500">
                          {movie.rating} <Star size={10} fill="currentColor" className="ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="snap-center shrink-0 w-[10px] md:w-[20px]"></div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 text-brand-text/50 font-semibold italic">
            No movies found matching "{movieSearch}"
          </div>
        )}
      </section>

      {/* Overlays / Modals */}
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onNext={hasNextBook ? handleNextBook : null}
          onPrev={hasPrevBook ? handlePrevBook : null}
        />
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </main>
  );
};

export default Shelf;
