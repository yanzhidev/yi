import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth'
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs, where, deleteDoc, doc, getDoc } from 'firebase/firestore'

// Firebase 配置 - 请替换为您自己的 Firebase 项目配置
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// 检查配置是否完整
const missingConfigs = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingConfigs.length > 0) {
  console.error('Firebase 配置缺失:', missingConfigs)
  console.error('请检查 .env.local 文件中的以下配置:', missingConfigs)
} else {
  console.log('Firebase 配置完整')
}

// 初始化 Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

console.log('Firebase 初始化成功')

// Google 认证提供者
export const googleProvider = new GoogleAuthProvider()

// 认证函数
export const signInWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, googleProvider)
  return result.user
}

export const logoutUser = async (): Promise<void> => {
  await signOut(auth)
}

// 历史记录相关类型
export interface HexagramHistory {
  id?: string
  userId: string
  question: string
  originalHexagram: {
    number: number
    name: string
    lines: number[]
  }
  changedHexagram?: {
    number: number
    name: string
    lines: number[]
  } | null
  changingLines: number[]
  timestamp: Date
}

// 保存历史记录
export const saveHexagramHistory = async (historyData: Omit<HexagramHistory, 'id' | 'timestamp'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'hexagramHistory'), {
    ...historyData,
    timestamp: new Date()
  })
  return docRef.id
}

// 删除历史记录
export const deleteHexagramHistory = async (docId: string, userId: string): Promise<void> => {
  // 先获取文档验证权限
  const docRef = doc(db, 'hexagramHistory', docId)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    throw new Error('历史记录不存在')
  }
  
  const data = docSnap.data() as HexagramHistory
  if (data.userId !== userId) {
    throw new Error('无权限删除此历史记录')
  }
  
  await deleteDoc(docRef)
}

// 获取用户历史记录
export const getUserHistory = async (userId: string, limitCount: number = 50): Promise<HexagramHistory[]> => {
  try {
    // 先尝试按时间排序的查询（需要索引）
    const q = query(
      collection(db, 'hexagramHistory'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date()
    } as HexagramHistory))
  } catch (error) {
    console.warn('索引查询失败，尝试简单查询:', error)
    // 如果索引未创建，使用简单查询
    const q = query(
      collection(db, 'hexagramHistory'),
      where('userId', '==', userId),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date()
    } as HexagramHistory))
    
    // 客户端按时间排序
    return results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }
}
