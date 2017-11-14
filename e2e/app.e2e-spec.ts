import { JcPapersPage } from './app.po';

describe('jc-papers App', () => {
  let page: JcPapersPage;

  beforeEach(() => {
    page = new JcPapersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
