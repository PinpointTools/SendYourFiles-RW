<script setup>
  function placeholder() {
    alert("Placeholder... I guess?");
  }
</script>

<template>
    <div class="mainExtras">
        <button @click="placeholder()" class="button a1"> Credits </button>
        <button @click="placeholder()" class="button a2"> About </button>
        <button @click="placeholder()" class="button a3"> Settings </button>
        <a href="https://github.com/PinpointTools/SendYourFiles-RW" class="button a4"> Github </a>
    </div>
</template>

<style scoped>
    .mainExtras {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;

        .button {
            width: 100px;
            box-sizing: border-box;
            
            &.a1 { animation: float 2s ease-in-out infinite; }
            &.a2 { animation: float 2s ease-in-out 0.3s infinite; }
            &.a3 { animation: float 2s ease-in-out 0.6s infinite; }
            &.a4 { animation: float 2s ease-in-out 0.9s infinite; }
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            
            .button {
                &.a1 { animation-name: xfloat; }
                &.a2 { animation-name: xfloat; animation-delay: 0.3s; }
                &.a3 { animation-name: xfloat; animation-delay: 0.6s; }
                &.a4 { animation-name: xfloat; animation-delay: 0.9s; }
            }
        }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes xfloat {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-10px); }
    }
</style>