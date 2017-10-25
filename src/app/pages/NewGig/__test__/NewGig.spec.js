import { mount } from 'vue-test-utils'
import NewGig from '@/app/pages/NewGig/NewGig.vue'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Quasar from 'quasar-framework'
import NewGigPage from '../../../__page_objects__/NewGigPage'
Vue.use(Vuelidate)
Vue.use(Quasar)

describe('New Gig', () => {

  const PAST_DATETIME = '1900/10/27'
  const FUTURE_DATETIME = '3000/10/27'

  let page, wrapper
  beforeEach(() => {
    wrapper = mount(NewGig)
    page = new NewGigPage(wrapper)
  })

  // it('matches full snapshot', async () => {
  //   page.matchSnapshot()
  // })

  describe('shows validation error', () => {

    describe('when validating name', () => {

      it('and name is cleared', async () => {
        page.dirtyValidation()
        await page.flushPromises()
        expect(page.text()).toContain('Name is required')
      })

      it('and name is too short (async)', async() => {
        page.writeNameAsync(tooShortName())
        await page.flushPromises()
        expect(page.text()).toContain('Minimum 5 characters.')
      })

      it('and name is too short', () => {
        page.writeName(tooShortName())
        expect(page.text()).toContain('Minimum 5 characters.')
      })

      it('and name is too long', () => {
        page.writeName(tooLongName())
        expect(page.text()).toContain('Maximum 20 characters.')
      })
    })

    describe('when validating datetime', () => {
      it('and datetime is cleared', async () => {
        page.dirtyValidation()
        await page.flushPromises()
        expect(page.text()).toContain('Date and time of gig are required.')
      })

      it('and datetime is in the past', async () => {
        page.writeDatetime(PAST_DATETIME)
        await page.flushPromises()
        expect(page.text()).toContain('You cannot set a gig in a past date :(')
      })
    })

    describe('does not show validation error', () => {
      it('and datetime is in the future', async () => {
        page.writeDatetime(FUTURE_DATETIME)
        await page.flushPromises()
        expect(page.hasDatetimeError()).toBe(false)
      })

      it('and name has valid length', async() => {
        page.writeNameAsync(nameWithValidLength())
        await page.flushPromises()
        expect(page.hasNameError()).toBe(false)
      })
    })
  })

  describe('save button', () => {
    it('is disabled by default', async () => {
      expect(page.isSaveButtonDisabled()).toBe(true)
    })

    it('is disabled when form not fully filled', async () => {
      page.writeNameAsync(nameWithValidLength())
      await page.flushPromises()
      expect(page.isSaveButtonDisabled()).toBe(true)
    })

    it('is disabled when form has errors', async () => {
      page.writeNameAsync(tooShortName())
      page.writeDatetime(PAST_DATETIME)
      await page.flushPromises()
      expect(page.isSaveButtonDisabled()).toBe(true)
    })

    it('is enabled when form is fully filled without errors', async () => {
      page.writeNameAsync(nameWithValidLength())
      page.writeDatetime(FUTURE_DATETIME)
      await page.flushPromises()
      expect(page.isSaveButtonDisabled()).toBe(false)
    })
  })
})

function nameWithValidLength() {
  return nameWithLength(5)
}

function tooShortName() {
  return nameWithLength(3)
}

function tooLongName() {
  return nameWithLength(21)
}

function nameWithLength(length) {
  return 'x'.repeat(length)
}
