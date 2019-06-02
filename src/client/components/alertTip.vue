<template>
        <div id="tip">
            <div id="tip_title">提示</div>
            <div id="tip_content">
                <slot name="tip"></slot>
            </div>
        </div>
</template>
<script>
    export default {}
</script>
<style>
    #tip {
        position: absolute;
        width: 70%;
        left: 15%;
        background-color: rgb(151, 151, 151);
        color: #fff;
        border-radius: 15px;
        top: 40%;
        box-shadow: 1px 1px 8px rgb(70, 70, 70);
        z-index: 24;
    }

    #tip_title {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding: 1.5rem;
        font-size: 15px;
        padding-top: 0.8rem;    
        padding-bottom:  0.8rem;
        background-color: rgb(204, 95, 95);
    }

    #tip_content {
        padding: 1.5rem;
    }

</style>