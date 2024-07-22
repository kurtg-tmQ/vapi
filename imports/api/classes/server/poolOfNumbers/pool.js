import DB from "../../../DB";
class Pool {
    #members = [];
    #currentIndex = 0;
    init() {
        this.#members = DB.Pools.find({}).fetch();
    }
    getPhone() {
        return this.#members[this.#currentIndex];
    }
    updateIndex() {
        if (this.#currentIndex !== this.#members.length - 1) {
            this.#currentIndex++;
        } else {
            this.#currentIndex = 0;
        }
    }

}
export default new Pool();