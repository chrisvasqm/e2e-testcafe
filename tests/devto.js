import HomePage from '../page/homepage';
import AboutPage from '../page/aboutpage';

const homePage = new HomePage();
const aboutPage = new AboutPage();

fixture("dev.to tests")
    .page("http://dev.to");

test("Check founders names in About page", async (t) => {
    await t
        .click(homePage.linkAbout)
        .expect(aboutPage.titleBenHalpern.exists).ok()
        .expect(aboutPage.titleJessLee.exists).ok()
        .expect(aboutPage.titlePeterFrank.exists).ok();
});
