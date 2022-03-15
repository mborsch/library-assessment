function findAccountById(accounts, id) {
  const foundAccount = accounts.find((account) => account.id === id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  const sortAccount = accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
  return sortAccount;
}

function getTotalNumberOfBorrows(account, books) {
  const user = account.id;
  let total = 0;
  books.forEach((book) =>
    book.borrows.forEach((borrow) => user === borrow.id && total++)
  );
  return total;
}

//helper function
function booksBorrowed(books, account) {
  const user = account.id;
  let booksStillRented = books.filter((book) =>
    book.borrows.some((borrow) => !borrow.returned && borrow.id === user)
  );
  return booksStillRented;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksOut = booksBorrowed(books, account);
  booksOut.forEach(
    (book) =>
      (book.author = authors.find((author) => book.authorId === author.id))
  );
  return booksOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
