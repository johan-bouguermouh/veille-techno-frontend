<script setup lang="ts">
import { defineProps, type Ref, type UnwrapRef } from 'vue'
import { onMounted, ref, watch } from 'vue'

/** Défini précisément les options de fermeture de la modale */
type ModalCloseOption = 'outside' | 'footer' | 'exit'

/** Défini les références des éléments de la modale */
type Refs = {
  headerRef: Ref<UnwrapRef<HTMLElement | null>> | null
  mainRef: Ref<UnwrapRef<HTMLElement | null>> | null
  footerRef: Ref<UnwrapRef<HTMLElement | null>> | null
}

const props = defineProps<{
  /** boolean qui permet de savoir si la modale est ouverte ou non */
  isOpen: boolean
  /** string qui permet de définir le titre de la modale */
  title: string
  /** fonction qui sera executée au moment du montage du composant */
  handleOnMounted?: () => void
  /** fonction qui sera executée au moment de la fermeture de la modale */
  handleOnCloseModal?: () => void
  /** fonction qui permet de mettre à jour la valeur de isOpen */
  handleIsOpen: (value: boolean) => void
  /** tableau de string qui permet de définir les options de fermeture de la modale
   * @value 'outside' - permet de fermer la modale en cliquant en dehors de celle-ci
   * @value 'footer' - permet d'ajouter un bouton annuler dans le footer de la modale
   * @value 'exit' - permet d'ajouter un bouton fermer dans le header de la modale
   */
  closeModaleProps?: ModalCloseOption[]
  /**
   * fonction qui permet de récupérer les références des éléments de la modale lorsque celle-ci est ouverte
   * @usage useRef={(collection)) => { ... }}
   * @param {Refs} collection - collection des références des éléments de la modale
   * @property {Ref<HTMLElement | null>} headerRef - référence de l'élément header de la modale
   * @property {Ref<HTMLElement | null>} mainRef - référence de l'élément main de la modale
   * @property {Ref<HTMLElement | null>} footerRef - référence de l'élément footer de la modale
   * @returns void
   * @example
   * **Change la couleur de fond du main de la modale**
   * <ModalComponent
   *  :isOpen="true"
   * :useRef={(collection)) => { collection.mainRef.value.style.backgroundColor = 'red'} }}
   * />
   *
   */
  useRef?: (collection: Refs) => void
}>()

/** Ref de HTMLElement du header de la modale */
const headerModal = ref<HTMLElement | null>(null)
/** Ref de HTMLElement du main la modale */
const mainModal = ref<HTMLElement | null>(null)
/** Ref de HTMLElement du footer de la modale */
const footerModal = ref<HTMLElement | null>(null)

/**
 * @define Permet de clore la modale en cliquant en dehors de celle-ci
 * @param $event
 * @property {function} handleIsOpen - la fonction sera executée
 * @property {function} handleOnCloseModal - la fonction sera executée
 * @returns void
 */
const closeModaleOutside = ($event: any) => {
  $event.stopPropagation()
  if (!props?.closeModaleProps?.includes('outside')) return
  if ($event.composedPath()[0].className === 'background-modale') {
    props.handleIsOpen(false)
    props?.handleOnCloseModal?.()
    return
  }
}

/**
 * @define Permet de clore la modale
 * @param {boolean} value - valeur qui sera assignée à isOpen en passant par handleIsOpen du parent
 * @property {function} handleIsOpen - la fonction sera executée
 * @property {function} handleOnCloseModal - la fonction sera executée
 * @returns void
 */
const closeModale = (value: boolean) => {
  props.handleIsOpen(value)
  props?.handleOnCloseModal?.()
}

onMounted(() => {
  props?.handleOnMounted?.()
})

watch([headerModal, mainModal, footerModal], () => {
  if (props.isOpen) {
    props?.useRef?.({ headerRef: headerModal, mainRef: mainModal, footerRef: footerModal })
  }
})

defineExpose({
  headerModal,
  mainModal,
  footerModal
})
</script>

<template>
  <div v-if="isOpen" class="background-modale" @click="closeModaleOutside($event)">
    <div class="wrapper-modal">
      <header class="header-modal">
        <h1>{{ title }}</h1>
        <button
          v-if="props?.closeModaleProps?.includes('exit')"
          class="button-close"
          type="button"
          @click="closeModale(false)"
        >
          <img alt="fermer la modale" src="../../assets/iconSVG/close.svg" width="20" height="20" />
        </button>
        <slot name="header-navigation" ref="headerModal" />
      </header>
      <hr />
      <main class="main-modal" ref="mainModal">
        <slot />
      </main>
      <footer class="footer-modal" ref="footerModal">
        <button
          v-if="props?.closeModaleProps?.includes('footer')"
          @click="closeModale(false)"
          class="button-simple"
          type="button"
        >
          Annuler
        </button>
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.background-modale {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(5px);
}
.background-modale > div {
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 10px 0px #00000033;
  padding: 12px;
  height: 50vh;
  width: 50vw;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.main-modal {
  flex: 1;
  overflow: auto;
}

.footer-modal {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 12px;
}

.header-modal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.header-modal h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000000ed;
}

.form-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
}

.form-task > .wrapper-modal {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  box-sizing: border-box;
}

.button-delete {
  background-color: #e63946;
  color: #ffffff;
}

fieldset {
  border: 0.5px solid #00000033;
  border-radius: 4px;
  color: #000000ed;
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
}
fieldset legend {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0 4px;
  margin: 0;
}

fieldset input,
textarea {
  width: 100%;
  padding: 4px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  color: #000000ed;
}

.footer-modal-form-task {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 12px;
}

button:not(.button-close) {
  justify-self: flex-end;
  align-self: flex-end;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 15px;
  border: none;
  min-width: 90px;
  min-height: 44px;
}
.button-close {
  position: absolute;
  top: 4px;
  right: 4px;
  border: none;
  width: 40px;
  height: 40px;
  background-color: transparent;
  color: #000000ed;
  padding: 4px;
  border-radius: 20px;
  cursor: pointer;
}
.button-submit {
  background-color: #640bad;
  color: #ffffff;
}
.button-simple:not([type='submit']) {
  background-color: #a3a3a3;
  color: #000000ed;
  border: 1px solid #00000033;
  margin-right: 12px;
}

button:not(.button-close):hover {
  filter: brightness(1.1);
  cursor: pointer;
  box-shadow: 0px 3px 10px 0px #00000033;
}
.button-close:hover img {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
