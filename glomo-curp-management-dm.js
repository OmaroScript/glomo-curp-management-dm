class GlomoCurpManagementDm extends Polymer.Element {

  static get is() {
    return 'glomo-curp-management-dm';
  }

  static get properties() {
    return {
      /**
       * This property saves the data of the curp entered or received
       * @type {String} 
       */
      curpData: {
        type: String,
        // value: 'HERM860929HGRRVG14'
        value: ''
      },
      customerName: {
        type: String,
        value: ''
      },
      customerLastName: {
        type: String,
        value: ''
      },
      customerSecondName: {
        type: String,
        value: ''
      },
      isValidCurp: {
        type: Boolean,
        value: false
      },
      hasCurpRegister: {
        type: Boolean,
        value: false
      },
      /**
       * Valid Gender
       */
      isValidGender: {
        type: Boolean,
        value: false
      },
      /**
       * Valid State
       */
      isValidState: {
        type: Boolean,
        value: false
      },
      /**
       * Valid Birthday
       */
      isValidBirthday: {
        type: Boolean,
        value: false
      },
      /**
       * User Gender string value
       */
      gender: {
        type: String,
        value: ''
      },
      /**
       * User Birthday string value
       */
      birthdayStr: {
        type: String,
        value: ''
      },
      /**
       * User State string
       */
      stateStr: {
        type: String,
        value: ''
      },
      /**
       * Data to expose on the second step
       */
      data: {
        type: Object
      },
      /**
       * Genders Catalog
       */
      genders: {
        type: Object,
        value: {
          'M': 'Mujer',
          'H': 'Hombre'
        }
      },
      /**
       * Genders Catalog  //vendran de servicio
       */
      states: {
        type: Object,
        value: {
          'NE': 'NACIONALIDAD EXTRANJERA',
          'AS': 'AGUASCALIENTES',
          'BC': 'BAJA CALIFORNIA',
          'BS': 'BAJA CALIFORNIA SUR',
          'CC': 'CAMPECHE',
          'CL': 'COAHUILA DE ZARAGOZA',
          'CM': 'COLIMA',
          'CS': 'CHIAPAS',
          'CH': 'CHIHUAHUA',
          'DF': 'CIUDAD DE MÉXICO',
          'DG': 'DURANGO',
          'GT': 'GUANAJUATO',
          'GR': 'GUERRERO',
          'HG': 'HIDALGO',
          'JC': 'JALISCO',
          'MC': 'MÉXICO',
          'MN': 'MICHOACÁN DE OCAMPO',
          'MS': 'MORELOS',
          'NT': 'NAYARIT',
          'NL': 'NUEVO LEÓN',
          'OC': 'OAXACA',
          'PL': 'PUEBLA',
          'QT': 'QUERÉTARO',
          'QR': 'QUINTANA ROO',
          'SP': 'SAN LUIS POTOSÍ',
          'SL': 'SINALOA',
          'SR': 'SONORA',
          'TC': 'TABASCO',
          'TS': 'TAMAULIPAS',
          'TL': 'TLAXCALA',
          'VZ': 'VERACRUZ DE IGNACIO DE LA LLAVE',
          'YN': 'YUCATÁN',
          'ZS': 'ZACATECAS',
          'NA': 'NO APLICA',
          'SI': 'SE IGNORA'
        }
      }
    };
  }

  setCurpData(data) {
    if (data !== '' && data !== null) {
      this.set('curpData', data);
      this._dispatchEvent('set-header-title', 'CURP');
      this._dispatchEvent('set-input-label', data);
      this._dispatchEvent('texto-error-icono', 'cells-step-input-message-curp-alert');
      this._dispatchEvent('text-description', 'cells-step-input-message-curp-description-two');
      this._dispatchEvent('show-icon-message', true);
    } else {
      this._dispatchEvent('show-icon-message', false);
      this._dispatchEvent('text-description', 'cells-step-input-message-curp-description');
      this._dispatchEvent('set-header-title', 'cells-step-input-message-curp-title-two');
      this._dispatchEvent('set-input-label', 'cells-step-input-message-curp-title');
    }

    this._dispatchEvent('show-skeleton-cells-step-list', true);
    this._dispatchEvent('set-list-file-info', [{id: 'example 2', text: 'cells-step-input-message-curp-security-message', icon: 'coronita:document'}]);
  }

  /**
   * @private Dispatches a custom event with name and detail
   * @param {String} name
   * @param {any} detail
   */
  _dispatchEvent(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }

  updateConfirmCurp() {
    let pendingOffer = {
      code: 'update-confirm-curp',
      selectedConfig: {
        acceptBtLabel: 'Continuar',
        // acceptBtLabel: 'Flujo con curp',
        onAcceptDetail: 'HEAO961119HMCRNM03',
        // cancelBtLabel: 'Flujo sin curp',
        className: 'full-height-error curp-update-confirm',
        openMaximized: true,
        title: 'Confirmar CURP',
        heroImage: './images/customerInformation/Verified-Document.svg',
        template: {
          type: 'paragraphs',
          values: [{
            text: `<h2>Confirmar CURP</h2>`,
          },
          {
            text: 'No podras editar tu CURP por cuestiones de seguridad; sin embargo, podrás confirmar este dato para ayudarnos a:'
          },
          {
            text: '<ul><li><p>Identificarte como cliente.</p></li><li><p>Mantener tu expediente actualizado para agilizar futuros trámites de contratación.</p></li><li><p>Detectar irregularidades en tus datos.</p></li></ul>',
            class: 'ul-li--text-left'
          }]
        }
      }
    };
    this.dispatchEvent(new CustomEvent('open-modal-with-info', {
      detail: pendingOffer,
      bubbles: true,
      composed: true
    }));
  }

  inputMessageChanged(data) {
    console.log(data);
  }

  getResponseFromService() {
    this.data = [
      { key: "Fecha de nacimiento", value: '19/11/1996' },
      { key: "Sexo", value: 'Hombre' },
      { key: "Entidad de nacimiento", value: 'Estado de México' }
    ];

    this._dispatchEvent('set-without-reason-text', 'HEAO961119HMCRNM03');
    this._dispatchEvent('set-data-user-confirm', this.data);
    this._dispatchEvent('show-spinner');
    this._dispatchEvent('show-skeleton-cells-step-list', false);
    this._dispatchEvent('close-spinner');
  }

  hideSpinner() {
    this._dispatchEvent('hide-spinner');
  }

  //Modal from info icon from input message
  setModalInfoIcon() {
    console.log('modal');
    this._dispatchEvent('help-icon-pressed', {
      code: 'code',
      selectedConfig: {
        className: 'info full-height-error curp-update',
        openMaximized: true,
        title: 'Información',
        acceptBtLabel: 'Entendido',
        template: {
          type: 'paragraphs',
          values: [
            { icon: 'coronita:help' },
            { text: ' ', class: 'spacing' },
            { title: 'CURP' },
            { text: ' ', class: 'spacing--xs' },
            { text: 'La CURP (Clave Única de Registro de Población) sirve para registrar en forma individual a todas las personas que residen en México, nacionales y extranjeras, así como a las mexicanas y mexicanos que radican en otros países.', class: 'text-center' },
            { text: ' ', class: 'spacing' },
            { text: ' ', class: 'spacing--xs' },
            { title: 'Renapo' },
            { text: ' ', class: 'spacing--xs' },
            { text: 'Renapo (Registro Nacional de Población e Identidad) es la Unidad Administrativa encargada de registrar y acreditar la identidad de las personas, a través de la asignación de la CURP.', class: 'text-center' }
          ]
        }
      }
    });
  }

  //Modal from list File from input message
  setModalListFile() {
    this._dispatchEvent('list-file-pressed', {
      code: 'code',
      selectedConfig: {
        className: 'full-height-error curp-update',
        //className: 'full-height-error header--white header--title-grey close-button--right',
        openMaximized: true,
        title: 'Aviso de privacidad',
        acceptBtLabel: 'Entendido',
        template: {
          type: 'paragraphs',
          values: [
            { text: ' ', class: 'spacing' },
            { title: 'AVISO DE PRIVACIDAD DE BBVA', class: 'spacing--xs' },
            { text: ' ', class: 'text-center' },
            { text: 'BBVA Bancomer, S.A., Institución de Banca Múltiple, Grupo Financiero BBVA Bancomer, Av. Paseo de la Reforma No. 510, Col. Juárez, Alcaldía Cuauhtémoc, C.P. 06600, CDMX, recaba tus datos personales, para verificar tu identidad, administrar, operar y dar seguimiento a los servicios y productos que solicitas o contratas.', class: 'text-center' },
            { text: ' ', class: 'spacing' },
            { text: 'Podrás consultar el Aviso de Privacidad Integral en cualquier sucursal y en www.bbva.mx', class: 'text-center' }
          ]
        }
      }
    });
  }

  continueCurpUpdate(detail) {
    
    let result = {
      id: '1234T',
      mainIcon: {
        src: './images/check_successful.svg',
        info: 'Operation Success'
      },
      mainTitle: {
        key: 'Actualización Exitosa',
        value: '2021-02-11T12:27:00',
        class: 'bold'
      },
      additionalInfo: [{
          value: 'Tu expediente se actualizo y se añadieron los siguientes datos:',
          class: 'spacing'
        },
        {
          key: 'CURP',
          value: 'HEAO961119HMCRNM03',
          class: 'spacing'
        },
        {
          key: 'Fecha de necimiento',
          value: '19/11/1996',
          class: 'bold spacing'
        },
        {
          key: 'Sexo',
          value: 'Hombre',
          class: 'bold spacing'
        },
        {
          key: 'Entidad de nacimiento',
          value: 'Estado de México',
          class: 'bold spacing'
        },
        {
          key: 'Folio de operación',
          value: '53423534523',
          class: 'bold spacing'
        },
        {
          key: 'Recibirás el comprobante de esta actualizacion en el siguiente correo',
          class: 'spacing'
        },
        {
          key: 'correo electrónico',
          value: '•619@gmail.com',
          class: 'bold cursive spacing'
        },
      ],

      buttons: {
        primary: {
          text: 'cells-successful-response-next',
          action: 'go-to-next'
        },
        secondary: {
          hidden: true
        }
      }
    };
    this._dispatchEvent('curp-update-process-succcess', result);
  }
}

customElements.define(GlomoCurpManagementDm.is, GlomoCurpManagementDm);
