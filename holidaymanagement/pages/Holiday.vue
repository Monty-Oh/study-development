<template>
  <div class="holiday-wrapper">
    <client-only>
      <link rel="stylesheet" type="text/css" href="../styles/jqx.base.css"/>
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossorigin="anonymous"/>
      <holiday-header></holiday-header>
      <holiday-search></holiday-search>
      <!--     <holiday-search-buttons></holiday-search-buttons>-->
      <!--     <holiday-list-buttons></holiday-list-buttons>-->
      <holiday-list></holiday-list>
    </client-only>
  </div>
</template>

<script>

import HolidayHeader from '../components/holiday/HolidayHeader';
import HolidaySearch from "../components/holiday/HolidaySearch";
// import HolidaySearchButtons from '../components/holiday/HolidaySearchButtons';
import HolidayListButtons from "../components/holiday/HolidayListButtons";
import HolidayList from "../components/holiday/HolidayList";

export default {
  components: {
    HolidayHeader,
    HolidaySearch,
    // HolidaySearchButtons,
    HolidayListButtons,
    HolidayList,
  }
}
</script>

<style scoped>
.holiday-wrapper {
  margin: 1.125rem;
  padding: 0;
}
</style>
