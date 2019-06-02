<template>
    <div class="chatBox">
        <input class="commonInput" :class='focus' type="text" @focus="inputFocus" @blur="inputBlur"/>
        <button class="commonInput_send">发布</button>
    </div>
</template>
<script>
    export default {
        name: 'common_input',
        data() {
            return {
                focus: ''
            }
        },
        methods: {
            inputFocus: function () {
                this.$data.focus = 'focus'
            },
            inputBlur: function(){
                this.$data.focus = ''
            }
        }
    }
</script>

<style>
    .chatBox {
        /* background-color: #6e6e6e; */
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid #BBB
    }
    .focus{
        height: 90px;
    }

    .commonInput {
        flex: 3;
        height: 22px;
        font-size: 16px;
        padding-left: 8px;
        border: 0
    }

    .commonInput_send {
        flex: 1;
        height: 28px;
        margin: 0;
        margin-left: 1px;
        border: 0;
        background-color: #389cff;
        color: #efefef;
        font-size: 14px;
        border-radius: 2px;
    }
</style>