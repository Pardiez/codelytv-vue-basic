import { mount } from 'vue-test-utils'
import Days from '@/app/pages/Days/Days.vue'
import { fakeGigsByDay } from '../../__mocks__/gigs-sample'
import { fakeGigsByDay2 } from '../../__mocks__/gigs-sample2'
import DayListPage from '../../__page_objects__/DaysPage'

jest.mock('../../services/MosicaRouter')
import { navigateToGigSpy } from '../../services/__mocks__/MosicaRouterSpy'

describe('Days', () => {
  const FIRST_DAY_GIG_TEXTS = fakeGigsByDay[0].gigs.map(
    gig => gig.title + ' - ' + gig.place)

  let page, wrapper
  beforeEach(async () => {
    wrapper = mount(Days)
    page = new DayListPage(wrapper)
    await page.updateAsync()
  })

  it('matches full snapshot', async() => {
    page.matchSnapshot()
  })

  it('renders all gigs in the first day', async() => {
    FIRST_DAY_GIG_TEXTS.map((text) => page.contains(text))
  })

  fit('navigates to first gig detail', async () => {
    const FIRST_GIG = fakeGigsByDay[0].gigs[0]
    page.clickFirstGig()
    expect(navigateToGigSpy).toHaveBeenCalledWith(FIRST_GIG.id)
  })

  fit('navigates to second gig detail', async () => {
    const SECOND_GIG = fakeGigsByDay[0].gigs[1]
    page.clickSecondGig()
    expect(navigateToGigSpy).toHaveBeenCalledWith(SECOND_GIG.id)
  })

  /* Different examples of more accurate tests that need
  to explicitly run over the DOM structure
  */

  it('render days', async () => {
    const DAYS = fakeGigsByDay.map((day) => day.day)
    expect(page.dayTexts()).toEqual(DAYS)
  })

  it('render gigs for each day', async () => {
    let expectedGigs
    fakeGigsByDay.map((day, index) => {
      expectedGigs = day.gigs.map((gig) => gig.title + ' - ' + gig.place)
      expect(page.gigRowsFor(index)).toEqual(expectedGigs)
    })
  })

  /* Test to demonstrate how to explicitly inject mosicaService as a prop
  (less MAGIC than manual jest mock)
   */
  it('render days(explicitly injected mock)', async () => {
    const gigService = {retrieveNextGigs: () => Promise.resolve(fakeGigsByDay2)}
    const wrapper = mount(Days, {propsData: {gigService}})
    page = new DayListPage(wrapper)
    await page.updateAsync()
    expect(wrapper.html()).toContain('rapsus')
  })

})
