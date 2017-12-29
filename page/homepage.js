import { Selector } from 'testcafe';

export default class HomePage {
    constructor() {
        this.linkAbout = Selector('a').withText('About');
        this.searchBar = Selector('#nav-search');
        this.articles = Selector('#substories > div');
    }
}