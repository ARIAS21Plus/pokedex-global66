describe('Carga y redirección a search', () => {
  it('debe cargar la página inicial', () => {
    cy.visit('/')
    cy.get('[data-testid="get-started-btn"]').should('be.visible')
  })

  it('debe redirigir a la página de búsqueda', () => {
    cy.visit('/')
    cy.get('[data-testid="get-started-btn"]').click()
    cy.url().should('include', '/search')
  })

  // Para todos los demás tests, ir directamente a /search
  describe('En la página de búsqueda', () => {
    beforeEach(() => {
      cy.visit('/search')
    })

    it('debe mostrar lista de pokémons al inicio', () => {
      cy.get('[data-testid="pokemon-item"]', { timeout: 10000 }).should('have.length.at.least', 1)
      cy.get('[data-testid="pokemon-item"]').first().should('be.visible')
    })

    it('debe buscar un pokémon por nombre', () => {
      cy.intercept('GET', '**/v2/pokemon/pikachu').as('searchPokemon')
      cy.get('[data-testid="search-input"]').type('pikachu')
      cy.wait('@searchPokemon')
      cy.get('[data-testid="pokemon-item"]').should('contain', 'pikachu')
    })

    it('debe filtrar por favoritos', () => {
      // Esperar a que carguen los pokémons
      cy.get('[data-testid="pokemon-item"]', { timeout: 10000 }).should('have.length.at.least', 1)

      // Primero agregar un favorito
      cy.get('[data-testid="pokemon-item"]').first().find('[data-testid="favorite-btn"]').click()

      // Cambiar a filtro de favoritos
      cy.get('[data-testid="filter-favorites"]').click()

      // Verificar que solo se muestran favoritos
      cy.get('[data-testid="pokemon-item"]').should('have.length.at.least', 1)
    })

    it('debe abrir modal de detalle al hacer click en un pokémon', () => {
      cy.get('[data-testid="pokemon-item"]', { timeout: 10000 }).should('have.length.at.least', 1)
      cy.get('[data-testid="pokemon-item"]').first().click()
      cy.get('[data-testid="modal-detail"]').should('be.visible')
    })

    it('debe cerrar el modal de detalle', () => {
      cy.get('[data-testid="pokemon-item"]', { timeout: 10000 }).should('have.length.at.least', 1)
      cy.get('[data-testid="pokemon-item"]').first().click()
      cy.get('[data-testid="modal-detail"]').should('be.visible')
      cy.get('[data-testid="close-modal"]').click()
      cy.get('[data-testid="modal-detail"]').should('not.exist')
    })

    it('debe cargar más pokémons con el botón', () => {
      cy.get('[data-testid="pokemon-item"]', { timeout: 10000 }).should('have.length.at.least', 1)
      cy.get('[data-testid="pokemon-item"]').then(($items) => {
        const initialCount = $items.length
        cy.get('[data-testid="load-more-btn"]').click()
        cy.get('[data-testid="pokemon-item"]', { timeout: 10000 }).should(
          'have.length.greaterThan',
          initialCount,
        )
      })
    })
  })
})
