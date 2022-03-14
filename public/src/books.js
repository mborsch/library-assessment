function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => parseInt(author.id) == id);
  return foundAuthor;
}

function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  const bookStatuses = [];
  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;
    if (isBookReturned) {
      unavailable.push(book);
    } else {
      available.push(book);
    }
  });
  bookStatuses.push(available);
  bookStatuses.push(unavailable);
  return bookStatuses;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const borrowers = borrows.map(({ id, returned }) => {
    const account = accounts.find((account) => account.id === id);
    return {
      ...account,
      returned,
    };
  });
  const solution = borrowers.sort((borrowerA, borrowerB) => {
    const compA = borrowerA.company;
    const compB = borrowerB.company;
    return compA.localeCompare(compB);
  });
  return solution.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
