import { Selector } from 'testcafe';

fixture("dev.to tests")
    .page("http://dev.to");

test("Check founders names in About page", async (t) => {
    const aboutLink = Selector('a').withText('About');
    const firstFounderName = Selector('b').withText('Ben Halpern');
    const secondFounderName = Selector('b').withText('Jess Lee');
    const thirdFounderName = Selector('b').withText('Peter Frank');

    await t // set the window size to it's max size
        .maximizeWindow()
        .click(aboutLink)
        .expect(firstFounderName.exists).ok()
        .expect(secondFounderName.exists).ok()
        .expect(thirdFounderName.exists).ok()
});
