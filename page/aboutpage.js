import { Selector } from 'testcafe';

export default class AboutPage {
    constructor() {
        this.titleBenHalpern = Selector('b').withText('Ben Halpern');
        this.titleJessLee = Selector('b').withText('Jess Lee');
        this.titlePeterFrank = Selector('b').withText('Peter Frank');
    }
}