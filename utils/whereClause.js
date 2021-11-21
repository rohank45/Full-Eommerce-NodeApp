//base - Product.find()
//  ###        search       page    filter                                                     limit
//bigQ - url/search=coder&page=2&category=hoodies&ratings[gte]=4&price[lte]=999&price[gte]=199&limit=5

class WhereClause {
  constructor(base, bigQ) {
    (this.base = base), (this.bigQ = bigQ);
  }

  // ### search method
  search() {
    const searchWord = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search,

            //options are not compulsory
            //i is for case sensitive search and g is for global search
            $options: "i",
          },
        }
      : {};

    //this.base.find() is like Product.find()
    this.base = this.base.find({ ...searchWord });
    return this;
  }

  // ### filter method
  filter() {
    const copyQ = { ...this.bigQ };

    delete copyQ["search"];
    delete copyQ["limit"];
    delete copyQ["page"];

    //convert bigQ into a String
    let stringofCopyQ = JSON.stringify(copyQ);
    stringofCopyQ = stringofCopyQ.replace(/\b(gte|lte)\b/g, (m) => `$${m}`);

    const jsonofCopyQ = JSON.parse(stringofCopyQ);
    this.base = this.base.find(jsonofCopyQ);
    return this;
  }

  // ### pager method
  pager(resultPerPage) {
    let currentPage = 1;

    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }

    const skipVal = resultPerPage * (currentPage - 1);

    this.base = this.base.limit(resultPerPage).skip(skipVal);
    return this;
  }
}

module.exports = WhereClause;
