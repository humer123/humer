<template>
    <PageLayout>
        <template v-slot:pageSlot>
            <div class="contact page-slot">
                <div class="contact__content-wrapper">
                    <h5 class="contact__title">Reach me</h5>
                    <ul class="contact__list">
                        <li class="contact__list-item"><span>E-mail: homergodinez9@gmail.com</span></li>
                    </ul>
                </div>
                <div class="contact__content-wrapper">
                    <h5 class="contact__title">Social Media</h5>
                    <ul class="contact__list">
                        <li class="contact__list-item"><span>facebook: homergodinez</span></li>
                        <li class="contact__list-item"><span>Instagram: homergodinez</span></li>
                        <li class="contact__list-item"><span>Github: https://github.com/notifications</span></li>
                    </ul>
                </div>
            </div>
        </template>
    </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/PageLayout.vue'
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
.contact {
    @include flex-layout($row-gap: 30px);

    &__title {
        @extend .heading;
        margin-bottom: 10px;
        border-radius: 3px;
    }

    &__list {
        list-style-type: disc;
        margin-left: 30px;
        line-height: 1.5;
    }
}
</style>    