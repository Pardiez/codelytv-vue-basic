import Vue from 'vue'
import {
  QList,
  QListHeader,
  QItem,
  QBtn,
  QToolbar,
  QToolbarTitle
} from 'quasar-framework'
import LoadSpinner from '@/app/shared/LoadSpinner.vue'
import Gig from '@/app/pages/Days/Gig.vue'
import Day from '@/app/pages/Days/Day.vue'

export function registerGlobalComponents() {
  Vue.component('LoadSpinner', LoadSpinner)
  Vue.component('Day', Day)
  Vue.component('Gig', Gig)
  Vue.component('QList', QList)
  Vue.component('QListHeader', QListHeader)
  Vue.component('QItem', QItem)
  Vue.component('QBtn', QBtn)
  Vue.component('QToolbar', QToolbar)
  Vue.component('QToolbarTitle', QToolbarTitle)
}
