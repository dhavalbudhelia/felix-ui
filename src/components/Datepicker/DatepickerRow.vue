<template>
    <div class="datepicker">
        <div class="week-label-container">
            <div v-for="dayName in dayNames" class="week-label">{{ dayName }}</div>
        </div>
        <div v-for="days in weeks" class="day-container">
            <div v-for="(day, key) in days"
                 :key="key"
                 @click="emitSelect(day)"
                 :class="dayClassObject(day)"
            >{{ day.date.format('D') }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fe-datepicker-row',
        props: {
            weeks: {
                type: Array,
                required: false,
                default: [],
            },
            dayNames: {
                type: Array,
                required: true,
            },
            selectedDay: {
                type: Object,
                required: false,
                default: null,
            }
        },
        methods: {
            /**
             * class object
             * @param day
             * @return {{previous: *, following: *, today: *, unselectable: *, day: boolean, selected: (boolean|*)}}
             */
            dayClassObject(day) {
                return {
                    'day': true,
                    'previous': day.previous,
                    'following': day.following,
                    'unselectable': day.unselectable,
                    'selected': (this.selectedDay !== null && day.date.isSame(this.selectedDay.date.format('YYYY-MM-DD'))),
                    'today': day.date.isSame(this.$dayjs().format('YYYY-MM-DD')),
                }
            },
            /**
             * emit select day event to the parent component
             * @param day
             */
            emitSelect(day) {
                if (!day.unselectable) {
                    this.$emit('select', day);
                }
            }
        },
    }
</script>
