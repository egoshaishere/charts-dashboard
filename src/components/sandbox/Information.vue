<template>
  <div>
    <p>https://habr.com/ru/post/668072/</p>
    <p>https://russianblogs.com/article/60271318810/</p>
    <div>
      Немного теории Стоит отметить, что я твердо убеждён, что каждый из
      способов описанных ниже не представляет из себя серебряной пули, так как
      имеет те или иные ограничения. Цель, которой мы должны придерживаться -
      это разработка самодостаточных отделимых друг от друга компонентов,
      представляющих из себя некий черный ящик, принимающий в себя что-то,
      выполняющий что-то внутри себя и, при необходимости, сообщающий окружающим
      о каких-либо событиях! Способов взаимодействия компонентов не так много:
      props/emits provide/inject composable (composition API) state manager
      (Vuex/Pinia) props/emits - прямое взаимодействие между компонентами! Такой
      подход обеспечивает прямой поток данных и строгое их изменение в
      определенном компоненте (при правильном применении). Может быть неудобен
      при большой вложенности (“props drilling”) и в каких-то нетиповых
      ситуациях. provide/inject - при правильном подходе позволит избежать
      “props drilling” и сохранить изменения непосредственно в родительском
      компоненте. Можно легко ошибиться и потерять реактивность/мутировать
      данные внутри дочерних компонентов/запутаться, кто из дочерних вызывает
      функцию для мутирования. Так же “привязывает” дочерние компоненты к
      родительскому. composable - добавляет гибкости и позволяет использовать
      одну логику с состоянием в нескольких компонентах. Здесь так же легко
      потерять “виновника” изменений и “соблазниться” удобством вынесения всего
      в composable файлы. Vuex/Pinia - практически аналогичен с composable. Для
      нашего вопроса уж точно. Здесь важно понимать, что любая неочевидная связь
      приносит с собой возможные скрытые эффекты, о которых будет знать и
      помнить (пока) тот разработчик, который это всё разрабатывал.
      Разработчику, которому посчастливится разобрать компоненты, которые
      связаны только по смыслу и что-то где-то внутри себя меняют, придётся
      потратить гораздо больше времени, чем с прямой связью между компонентами.
      Так или иначе, все это лишь моё субъективное мнение, которое не является
      неоспоримой истиной. Отмечу, что неоспоримым остаётся тот факт, что
      применение того или иного подхода должно быть задокументировано на каждом
      проекте, а разработчики должны отдавать себе отчет в применении этих
      подходов.
    </div>
  </div>
</template>

<script>
export default {
  name: "Information",
};
</script>

<style>
</style>