import localStorage from "localStorage";
import { Meteor } from "meteor/meteor";
import moment from "moment";

/**
 * Watcher class
 * - make a class reactive
 */
export default class Watcher {
    #parent;
    #user = null;
    #stack = {};
    #watcher = {};
    #mounted = {};
    #settings = {};
    #isRendering_ = {};
    #subscriptions = {};
    #callFunction = null;
    #callSubscribe = null;
    #logout = () => { };
    /**
     * 
     * @param {Watcher} parent 
     */
    constructor(parent) {
        this.#parent = parent;
    }
    get Settings() {
        if (this.#parent)
            return this.#parent.Settings;
        return this.#settings;
    }
    get Parent() {
        return this.#parent;
    }
    /**
     * @returns {localStorage}
     */
    get Storage() {
        return localStorage;
    }
    get NativeSubscribe() {
        return this.#callSubscribe || this.#parent.#callSubscribe;
    }
    get NativeCall() {
        return this.#callFunction || this.#parent.#callFunction;
    }
    get User() {
        return this.#user();
    }
    get IsLoggedIn() {
        return !!Meteor.userId();
    }
    /**
     * Hide sensitive functions
     */
    secureTransaction() {
        this.login = Meteor.loginWithPassword;
        this.user = Meteor.user;
        this.users = Meteor.users;
        this.#callFunction = Meteor.call;
        this.#callSubscribe = Meteor.subscribe;
        this.#settings = Meteor.settings.public;
        this.users.deny({ update: () => true });
        this.#logout = Meteor.logout;
        Meteor.users = null;
        Meteor.user = () => { };
        Meteor.loginWithPassword = () => { };
        Meteor.loginWithToken = () => { };
        Meteor.logout = () => { };
        Meteor.call = () => { };
        Meteor.subscribe = () => { };
        Meteor.settings.public = {};
    }
    logout() {
        this.#logout(() => {
            window.location.reload();
        });
    }
    /**
     * Attach obj component to this class
     * @param {Component} obj obj: Component reference to add watcher
     * @param {String} name name: reference name for the Component's watcher
     */
    setWatcher(obj, name) {
        if (!name)
            throw Error("Watcher name is required!");
        if (!obj)
            throw Error("Watcher component is required!");
        this.#watcher[name] = obj;
        let func = obj.componentDidMount || (() => { });
        let func2 = obj.componentWillUnmount || (() => { });
        let func3 = obj.getSnapshotBeforeUpdate || (() => null);
        let func4 = obj.componentDidUpdate || (() => { });
        func = func.bind(obj);
        func2 = func2.bind(obj);
        obj.componentDidMount = () => {
            func.call(obj);
            this.#mounted[name] = true;
        };
        obj.componentWillUnmount = () => {
            delete this.#mounted[name];
            func2.call(obj);
        };
        obj.getSnapshotBeforeUpdate = (prevProps, prevState) => {
            this.#isRendering_[name] = true;
            return func3.call(obj, prevProps, prevState) || null;
        };
        obj.componentDidUpdate = (prevProps, prevState, snapshot) => {
            func4.call(obj, prevProps, prevState, snapshot);
            delete this.#isRendering_[name];
        };
    }
    /**
     * Initiate this class for reactivity
     * @param {String} name name: get the watcher objet by reference name
     */
    initiateWatch(name) {
        if (name)
            return this.#watcher[name];
        return null;
    }
    /**
     * Detach current component to this class
     * @param {String} name name: reference name of watcher to remove
     */
    removeWatcher(name) {
        if (this.#watcher[name])
            delete this.#watcher[name];
    }
    /**
     * Trigger reactivity variable
     */
    activateWatcher() {
        if (!Object.keys(this.#watcher).length) return;
        for (let key in this.#watcher) {
            if (this.#mounted[key]) {
                if (this.#isRendering_[key]) {
                    if (this.#stack[key])
                        clearTimeout(this.#stack[key]);
                    this.#stack[key] = setTimeout(() => {
                        this.activateWatcher();
                    }, 100);
                } else
                    this.#watcher[key].setState({ navigateWatch: moment().valueOf() });
            }
        }
    }
    /**
     * Call function to server
     * @param {number} methodId
     * @param {Object} request
     * @returns {Promise}
     */
    callFunc(methodId, request) {
        return new Promise((resolve, reject) => {
            this.#callFunction(methodId, request, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
    /**
     * Subscribe data from server
     * @param {number} pubId
     * @param {jspb.Message} request
     * @returns {boolean} return value once the subscription is done and ready
     */
    subscribe(pubId, request) {
        if (this.#callSubscribe || this.#parent.#callSubscribe) {
            let isReady = false;
            let params = [pubId, request];

            let lastId = null;
            if (this.#subscriptions[pubId]) {
                lastId = this.#subscriptions[pubId].subscriptionId;
                if (Meteor.connection._subscriptions[lastId])
                    Meteor.connection._subscriptions[lastId].inactive = true;
            }

            this.#subscriptions[pubId] = (this.#callSubscribe || this.#parent.#callSubscribe).apply(this, params);

            if (this.#subscriptions[pubId]) {
                isReady = this.#subscriptions[pubId].ready();
                if (this.#subscriptions[pubId].subscriptionId != lastId && Meteor.connection._subscriptions[lastId]
                    && Meteor.connection._subscriptions[lastId].inactive) {
                    Meteor.connection._subscriptions[lastId].stop();
                }
            }

            return isReady;
        }
        return false;
    }
    /**
     * Get Subscription object
     * @param {String} id 
     * @returns {Object}
     */
    getSubscription(id) {
        if (this.#subscriptions[id])
            return this.#subscriptions[id];
        return null;
    }
}