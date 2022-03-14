function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let counter = 0;
  books.forEach((book) => {
    if (book.borrows[0]["returned"] === false) {
      counter = counter + 1;
    }
  });
  return counter;
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre);
  const popularList = [];
  genres.map((genre) => {
    const findGenre = popularList.findIndex(
      (element) => element.name === genre
    );
    if (findGenre >= 0) {
      popularList[findGenre].count = popularList[findGenre].count + 1;
    } else {
      popularList.push({ name: genre, count: 1 });
    }
  });
  popularList.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  return popularList.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  popularBooks.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  return popularBooks.slice(0, 5);

  //returning undefined needs fixing
}

function getMostPopularAuthors(books, authors) {
  const popularAuthor = authors.map((author) => ({
    ...author,
    borrows: books
      .filter((book) => book.authorId === author.id)
      .reduce((acc, cur) => acc + cur.borrows.length, 0),
  }));
  popularAuthor.sort((authA, authB) =>
    authA.borrows < authB.borrows ? 1 : -1
  );
  const solution = popularAuthor.map((auth) => {
    return {
      name: `${auth.name.first} ${auth.name.last}`,
      count: auth.borrows,
    };
  });
  return solution.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
